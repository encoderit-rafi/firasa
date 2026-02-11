"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircleIcon, XIcon, Loader2 } from "lucide-react";

import { Button } from "./button";
import { Guard, Upload, VideoCam } from "@/assets/icons";
import TextSeparator from "./text-separator";
import { useVideoUpload } from "@/hooks/use-video-upload";
import { cn } from "@/lib/utils";

export default function VideoUploader() {
  const {
    status,
    progress,
    duration,
    videoId,
    analysisLogs,
    startRecording,
    stopRecording,
    uploadFile,
    startAnalysis,
    recordedBlob,
  } = useVideoUpload();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatTime = (s: number) => {
    return (
      String(Math.floor(s / 60)).padStart(2, "0") +
      ":" +
      String(s % 60).padStart(2, "0")
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleStartUpload = async () => {
    let fileToUpload = selectedFile;
    let type: "file" | "record" = "file";

    if (!fileToUpload && recordedBlob) {
      fileToUpload = new File([recordedBlob], "recorded-video.webm", {
        type: "video/webm",
      });
      type = "record";
    }

    if (fileToUpload) {
      await uploadFile(fileToUpload, type);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (status === "recording" && videoPreviewRef.current) {
      startRecording().then((stream) => {
        if (stream && videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = stream;
        }
      });
    }
  }, [status, startRecording]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div
          className={cn(
            "relative py-12 flex min-h-64 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors",
            status === "recording"
              ? "bg-black"
              : "bg-custom-error-95 border-error",
          )}
        >
          {status === "recording" ? (
            <div className="w-full h-full relative flex flex-col items-center">
              <video
                ref={videoPreviewRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="size-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white font-mono">
                  {formatTime(duration)}
                </span>
              </div>
              <Button
                variant="destructive"
                className="mt-4"
                onClick={stopRecording}
              >
                Stop Recording
              </Button>
            </div>
          ) : previewUrl ? (
            <div className="absolute inset-0">
              <video
                controls
                className="size-full object-contain"
                src={previewUrl}
              />
              <button
                aria-label="Remove video"
                className="absolute top-4 right-4 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-[color,box-shadow] hover:bg-black/80"
                onClick={handleRemoveFile}
                type="button"
              >
                <XIcon aria-hidden="true" className="size-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-6 items-center justify-center px-4 py-3 text-center">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-56.25"
                >
                  <Upload />
                  Choose video file
                </Button>
                <p className="body-small-primary">Max file size 128 MB</p>
              </div>

              <TextSeparator />
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-56.25"
                  onClick={() => startRecording()}
                >
                  <VideoCam />
                  Record with camera
                </Button>
                <p className="body-small-primary">Record a video</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {(status === "uploading" ||
        status === "completed" ||
        status === "analyzing") && (
        <div className="bg-white p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              {status === "uploading"
                ? "Uploading video..."
                : status === "completed" && !videoId
                  ? "Upload complete"
                  : status === "analyzing"
                    ? "AI Analysis in progress..."
                    : "Ready for analysis"}
            </span>
            <span className="text-xs text-muted-foreground">{progress}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {status === "completed" && videoId && (
            <Button
              onClick={() => startAnalysis(videoId)}
              className="w-full mt-2"
            >
              Start AI Analysis
            </Button>
          )}

          {analysisLogs.length > 0 && (
            <div className="mt-4 p-3 bg-muted rounded-lg text-xs font-mono max-h-40 overflow-y-auto">
              {analysisLogs.map((log, i) => (
                <div key={i} className="mb-1">
                  <span className="text-primary">[{log.stage}]</span>{" "}
                  {log.progress}% — {log.message}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {status === "idle" && (selectedFile || recordedBlob) && (
        <Button onClick={handleStartUpload} className="w-full" size="lg">
          Upload and Continue
        </Button>
      )}

      <p className="mt-2 text-center text-muted-foreground text-xs flex items-center justify-center gap-2">
        <Guard className="size-4" />
        Auto-deleted. Your privacy is our priority.
      </p>
    </div>
  );
}
