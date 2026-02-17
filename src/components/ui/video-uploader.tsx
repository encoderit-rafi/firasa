"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircleIcon, XIcon, Loader2 } from "lucide-react";

import { Button } from "./button";
import { Guard, LoadingIcon, Upload, VideoCam, X } from "@/assets/icons";
import TextSeparator from "./text-separator";
import { useVideoUpload } from "@/hooks/use-video-upload";
import { cn } from "@/lib/utils";
import { Recording } from "./video/Recording";

export default function VideoUploader() {
  const {
    status,
    progress,
    duration,
    videoId,
    analysisLogs,
    startRecording,
    recordingStatusUpdate,
    uploadFile,
    stopRecording,
    recordingStatusIdle,
    startAnalysis,
    cancelUpload,
    recordedBlob,
  } = useVideoUpload();


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
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
      // type = "record";
      type = "file";
    }

    if (fileToUpload) {
      console.log("fileToUpload", fileToUpload);
      await uploadFile(fileToUpload, type);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCancelUpload = () => {
    cancelUpload();
    handleRemoveFile();
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

  useEffect(() => {
    if (status === "idle") {
      if (selectedFile || recordedBlob) {
        handleStartUpload();
      }
    }
  }, [selectedFile, recordedBlob, status]);

  useEffect(() => {
    if (status === "uploaded" && videoId) {
      startAnalysis(videoId);
    }
  }, [status, videoId, startAnalysis]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div
          className={cn(
            "relative py-12 flex min-h-64 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors",
            "bg-custom-error-95 border-error",
          )}
        >
          {status === "recording" ? (
            <Recording
              videoPreviewRef={videoPreviewRef}
              startRecording={startRecording}
              stopRecording={stopRecording}
              recordingStatusIdle={recordingStatusIdle}
              handleStartUpload={handleStartUpload}
            />
          ) : status === "uploading" ||
            status === "uploaded" ||
            status === "analyzing" ? (
            <div className="flex flex-col items-center justify-center w-full p-4 gap-6 text-center">
              <div className="flex items-center justify-between w-full ">
                <div className="flex-1">
                  <p className="body-large-emphasized text-left">
                    {selectedFile?.name}
                  </p>
                  <p className="body-small-primary  text-left">
                    {formatBytes(selectedFile?.size || recordedBlob?.size || 0)}
                  </p>
                </div>
                <div className="">
                  <Button
                    variant="ghost"
                    size={"icon"}
                    onClick={handleCancelUpload}
                  >
                    <XIcon />
                  </Button>
                </div>
              </div>

              <div className="w-full  space-y-6">
                <div className="w-full bg-error-container rounded-full h-0.5 overflow-hidden">
                  <div
                    className="bg-error h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex-center gap-2 rounded-full bg-on-surface/10 px-6 py-4 mx-auto w-fit">
                  <LoadingIcon />
                  <span className="title-medium-primary text-on-surface/50">
                    {status === "uploading" ? "Uploading..." : "Analyzing..."} (
                    {progress}%)
                  </span>
                </div>
              </div>
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
                  onClick={() => recordingStatusUpdate()}
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

      <p className="mt-2 text-center text-muted-foreground text-xs flex items-center justify-center gap-2">
        <Guard className="size-4" />
        Auto-deleted. Your privacy is our priority.
      </p>
    </div>
  );
}
