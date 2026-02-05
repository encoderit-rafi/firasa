"use client";

import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "./button";
import { Guard, Upload, VideoCam } from "@/assets/icons";
import TextSeparator from "./text-separator";

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
          className="relative py-12 flex min-h-52 flex-col items-center bg-custom-error-95 justify-center overflow-hidden rounded-xl border border-error border-dashed p-4 transition-colors  has-disabled:pointer-events-none has-[input:focus]:border-ring has-[img]:border-none has-disabled:opacity-50 has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-error-container/20"
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
            <div className="flex flex-col space-y-6 items-center justify-center px-4 py-3 text-center">
              <div className="flex flex-col gap-2">
                <Button onClick={openFileDialog} className="w-56.25">
                  <Upload />
                  Choose video file
                </Button>
                <p className="body-small-primary">Max file size 128 MB</p>
              </div>

              <TextSeparator />
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-56.25">
                  <VideoCam />
                  Record with camera
                </Button>
                <p className="body-small-primary">Record a 25 seconds video</p>
              </div>
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
