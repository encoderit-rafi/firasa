"use client";

import { useState, useRef, useCallback } from "react";
import { api } from "@/axios";
import { toast } from "sonner";
import { AxiosProgressEvent } from "axios";

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

export type UploadStatus =
  | "idle"
  | "recording"
  | "uploading"
  | "analyzing"
  | "completed"
  | "error";

export type AnalysisLog = {
  stage: string;
  progress: number;
  message: string;
};

export const useVideoUpload = () => {
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

  const startRecording = useCallback(async () => {
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
      setStatus("recording");
      setDuration(0);

      const startTime = Date.now();
      timerIntervalRef.current = setInterval(() => {
        const d = Math.floor((Date.now() - startTime) / 1000);
        setDuration(d);
        if (d >= 60) {
          stopRecording();
          toast.info("Recording reached 60 seconds limit");
        }
      }, 1000);

      return stream;
    } catch (err) {
      console.error("Error starting recording:", err);
      toast.error("Could not access camera/microphone");
      return null;
    }
  }, [stopRecording]);

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

        const initRes = await api.post("/videos/uploads/init", initInfo);
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
        const completeRes = await api.post("/videos/uploads/complete", {
          upload_id: newUploadId,
        });
        const newVideoId = completeRes.data.data.video_id;
        setVideoId(newVideoId);
        setStatus("completed");
        toast.success("Upload complete!");
        return newVideoId;
      } catch (err) {
        console.error("Upload failed", err);
        setStatus("error");
        toast.error("Upload failed");
        return null;
      }
    },
    [duration],
  );

  const startAnalysis = useCallback(async (vidId: string) => {
    if (!vidId) return;
    setStatus("analyzing");
    setAnalysisLogs([]);
    setProgress(0);

    const formData = new FormData();
    formData.append("use_tta", "true");
    formData.append("method", "face+middle");
    formData.append("generate_report", "true");

    try {
      // SSE implementation using Fetch with long response
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/videos/${vidId}/analyze`,
        {
          method: "POST",
          // Pass auth token if needed, usually via headers
          // headers: { "Authorization": `Bearer ${token}` }
          body: formData,
        },
      );

      if (!response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";

        for (const part of parts) {
          if (part.startsWith("data:")) {
            try {
              const data = JSON.parse(part.replace("data:", "").trim());
              setAnalysisLogs((prev) => [...prev, data]);
              setProgress(data.progress || 0);
              if (data.stage === "complete") {
                setStatus("completed");
              }
            } catch (e) {
              console.error("Error parsing SSE data", e);
            }
          }
        }
      }
    } catch (err) {
      console.error("Analysis failed", err);
      setStatus("error");
      toast.error("Analysis failed");
    }
  }, []);

  return {
    status,
    progress,
    duration,
    uploadId,
    videoId,
    analysisLogs,
    startRecording,
    stopRecording,
    uploadFile,
    startAnalysis,
    recordedBlob:
      chunksRef.current.length > 0
        ? new Blob(chunksRef.current, { type: "video/webm" })
        : null,
  };
};
