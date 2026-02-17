"use client";

import { useState, useRef, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/axios";
import { toast } from "sonner";
import { AxiosProgressEvent } from "axios";

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

export type UploadStatus =
  | "idle"
  | "recording"
  | "uploading"
  | "uploaded"
  | "analyzing"
  | "completed"
  | "error";

export type AnalysisLog = {
  stage: string;
  progress: number;
  message: string;
};

export const useVideoUpload = () => {
  const router = useRouter();
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [uploadId, setUploadId] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [analysisLogs, setAnalysisLogs] = useState<AnalysisLog[]>([]);
  const [duration, setDuration] = useState(0);

  // Recording refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const stopRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  }, []);

  const startRecording = useCallback(async (timerDuration: number | null = 65) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      mediaStreamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        setStatus("idle");
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      };

      recorder.start();

      setDuration(0);

      const startTime = Date.now();
      timerIntervalRef.current = setInterval(() => {
        const d = Math.floor((Date.now() - startTime) / 1000);
        setDuration(d);
        if (timerDuration && d >= timerDuration) {
          stopRecording();
          toast.info(`Recording reached ${timerDuration} seconds limit`);
        }
      }, 1000);

      return stream;
    } catch (err) {
      console.error("Error starting recording:", err);
      toast.error("Could not access camera/microphone");
      return null;
    }
  }, [stopRecording]);

  const recordingStatusUpdate = () => {
    setStatus("recording");
  }
  const recordingStatusIdle = () => {
    setStatus("idle");
  }

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(Math.round(video.duration));
      };
      video.onerror = () => {
        resolve(0);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const uploadFile = useCallback(
    async (file: File, uploadType: "file" | "record") => {
      try {
        let finalDuration = duration;
        if (uploadType === "file" && finalDuration === 0) {
          finalDuration = await getVideoDuration(file);
        }

        if (finalDuration > 60) {
          toast.error("Video duration must not exceed 60 seconds.");
          setStatus("idle");
          return null;
        }

        setStatus("uploading");
        setProgress(0);
        abortControllerRef.current = new AbortController();

        // 1. Init Upload
        const initInfo = {
          upload_type: uploadType,
          source: "web",
          mime_type: file.type,
          file_name: file.name,
          file_size: file.size,
          total_chunks: Math.ceil(file.size / CHUNK_SIZE),
          video_duration: finalDuration || 1, // Fallback to 1 to avoid API error
        };

        const initRes = await api.post("/videos/uploads/init", initInfo, {
          signal: abortControllerRef.current.signal,
        });
        const newUploadId = initRes.data.data.upload_id;
        setUploadId(newUploadId);

        // 2. Upload Chunks
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        for (let i = 0; i < totalChunks; i++) {
          const start = i * CHUNK_SIZE;
          const end = Math.min(file.size, start + CHUNK_SIZE);
          const chunk = file.slice(start, end);

          const formData = new FormData();
          formData.append("upload_id", newUploadId);
          formData.append("chunk_index", i.toString());
          formData.append("chunk", chunk);

          await api.post("/videos/uploads/chunk", formData, {
            signal: abortControllerRef.current.signal,
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              if (progressEvent.total) {
                const chunkProgress =
                  progressEvent.loaded / progressEvent.total;
                const overallProgress = Math.floor(
                  ((i + chunkProgress) / totalChunks) * 100,
                );
                setProgress(overallProgress);
              }
            },
          });
        }

        // 3. Complete Upload
        const completeRes = await api.post(
          "/videos/uploads/complete",
          {
            upload_id: newUploadId,
          },
          {
            signal: abortControllerRef.current.signal,
          },
        );
        const newVideoId = completeRes.data.data.video_id;
        setVideoId(newVideoId);
        setStatus("uploaded");
        toast.success("Upload complete!");
        return newVideoId;
      } catch (err: any) {
        if (err.name === "CanceledError" || err.name === "AbortError") {
          console.log("Upload canceled");
          return null;
        }
        console.error("Upload failed", err);
        setStatus("error");
        toast.error("Upload failed");
        return null;
      } finally {
        abortControllerRef.current = null;
      }
    },
    [duration],
  );

  const { mutate: analyzeVideos, isPending: isAnalyzing } = useMutation({
    mutationFn: async (vidId: string) => {
      if (!vidId) return;
      setStatus("analyzing");
      setAnalysisLogs([]);
      setProgress(0);

      const formData = new FormData();
      formData.append("use_tta", "true");
      formData.append("method", "face+middle");
      formData.append("generate_report", "true");

      // SSE implementation using Axios with fetch adapter for streaming
      const response = await api.post(`/videos/${vidId}/analyze`, formData, {
        responseType: "stream",
        // @ts-ignore
        adapter: "fetch",
      });

      if (!response.data) return;
      const reader = response.data.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        console.log(`👉 ~ useVideoUpload ~ { value, done }:`, { value, done });
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";

        for (const part of parts) {
          if (part.startsWith("data:")) {
            try {
              const data = JSON.parse(part.replace("data:", "").trim());
              setProgress(data.progress || 0);
              if (data.stage === "complete") {
                setStatus("completed");
                router.push(`/score?analysis_id=${data.analysis_id}`);
              }
            } catch (e) {
              console.error("Error parsing SSE data", e);
            }
          }
        }
      }
    },
    onError: (err) => {
      console.error("Analysis failed", err);
      setStatus("error");
      toast.error("Analysis failed");
    },
  });

  const startAnalysis = useCallback(
    (vidId: string) => {
      analyzeVideos(vidId);
    },
    [analyzeVideos],
  );

  const cancelUpload = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setStatus("idle");
    setProgress(0);
    setUploadId(null);
    setVideoId(null);
    setDuration(0);
    chunksRef.current = [];
  }, []);

  return {
    status,
    progress,
    duration,
    uploadId,
    videoId,
    analysisLogs,
    startRecording,
    recordingStatusUpdate,
    recordingStatusIdle,
    stopRecording,
    uploadFile,
    startAnalysis,
    cancelUpload,
    recordedBlob:
      chunksRef.current.length > 0
        ? new Blob(chunksRef.current, { type: "video/webm" })
        : null,
  };
};
