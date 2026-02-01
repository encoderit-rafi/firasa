"use client";

import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "./button";
import { Guard, Upload, VideoCam } from "@/assets/icons";

export default function VideoUploader() {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
  });

  const previewUrl = files[0]?.preview || null;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        {/* Drop area */}
        <div
          className="relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-error border-dashed p-4 transition-colors bg-custom-error-95 hover:bg-custom-error-95/20 has-disabled:pointer-events-none has-[input:focus]:border-ring has-[img]:border-none has-disabled:opacity-50 has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-custom-error-95/20"
          data-dragging={isDragging || undefined}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          role="button"
          tabIndex={-1}
        >
          <input
            {...getInputProps()}
            aria-label="Upload file"
            className="sr-only"
          />
          {previewUrl ? (
            <div className="absolute inset-0">
              <img
                alt={files[0]?.file?.name || "Uploaded image"}
                className="size-full object-cover"
                src={previewUrl}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              {/* <div
                aria-hidden="true"
                className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
              >
                <ImageUpIcon className="size-4 opacity-60" />
              </div> */}
              <Button onClick={openFileDialog}>
                <Upload />
                Choose video file
              </Button>
              <div
                className="relative flex items-center text-sm text-gray-500
            before:content-[''] before:flex-1 before:border-t before:border-error-container
            after:content-[''] after:flex-1 after:border-t after:border-error-container"
              >
                <span className="px-3">OR</span>
              </div>
              <Button variant="outline">
                <VideoCam />
                Record with camera
              </Button>
              {/* <p className="mb-1.5 font-medium text-sm">
                Drop your image here or click to browse
              </p>
              <p className="text-muted-foreground text-xs">
                Max size: {maxSizeMB}MB
              </p> */}
              <p className="mt-2 text-center text-muted-foreground text-xs">
                Record a 25 seconds video
              </p>
            </div>
          )}
        </div>
        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              aria-label="Remove image"
              className="z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-[color,box-shadow] hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              onClick={() => removeFile(files[0]?.id)}
              type="button"
            >
              <XIcon aria-hidden="true" className="size-4" />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-destructive text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
      <p className="mt-2 text-center text-muted-foreground text-xs flex-center gap-3">
        <Guard className="size-4" />
        Auto-deleted. Your privacy is our priority.
      </p>
    </div>
  );
}
