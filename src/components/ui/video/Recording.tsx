"use client";

import { Button } from "../button";
import { RefObject, useState, useEffect, useCallback } from "react";
import { VideoCam } from "@/assets/icons";
import { X } from "lucide-react";
import Icon from "../icon";
import { CircularProgress } from "@/components/progress-08";

interface RecordingProps {
    videoPreviewRef: RefObject<HTMLVideoElement | null>;
    startRecording: () => Promise<MediaStream | null>;
    stopRecording: () => void;
    recordingStatusIdle: () => void;
    duration: number;
}

export function Recording({
    videoPreviewRef,
    startRecording,
    stopRecording,
    recordingStatusIdle,
    duration,
}: RecordingProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [fadeKey, setFadeKey] = useState(0);
    const [progress, setProgress] = useState(0);

    const formatTime = (s: number) => {
        return (
            String(Math.floor(s / 60)).padStart(2, "0") +
            ":" +
            String(s % 60).padStart(2, "0")
        );
    };

    const handleStart = useCallback(async () => {
        // Start camera preview first
        setIsRecording(true);
        const stream = await startRecording();
        if (stream && videoPreviewRef.current) {
            videoPreviewRef.current.srcObject = stream;
        }
        // Begin countdown instead of recording immediately
        setCountdown(5);
        setFadeKey((k) => k + 1);
    }, [startRecording, videoPreviewRef]);

    useEffect(() => {
        if (countdown === null) return;

        if (countdown === 0) {
            // Countdown finished — actual recording starts via startRecording
            // (already called above to get the stream; the hook starts MediaRecorder)
            setCountdown(null);
            return;
        }

        const timer = setTimeout(() => {
            setCountdown((prev) => (prev !== null ? prev - 1 : null));
            setFadeKey((k) => k + 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown]);

    const handleStop = () => {
        if (isRecording) {
            stopRecording();
        }
        setIsRecording(false);
        setCountdown(null);
        recordingStatusIdle();
    };

    const iconData = [
        {
            id: 1,
            icon: "⏳",
            text: "It's ok to think before answer. 25 seconds for each question"
        },
        {
            id: 2,
            icon: "⏱️",
            text: "It's ok if you didn't get enough time for every answer"
        },
        {
            id: 3,
            icon: "😊",
            text: "Natural reactions help us more than perfect responses"
        }
    ];

    const questions = [
        {
            id: 1,
            text: "What is your name?"
        },
        {
            id: 2,
            text: "What is your age?"
        },
        {
            id: 3,
            text: "What do you like?"
        },
        {
            id: 4,
            text: "What is your favourite food?"
        },
        {
            id: 5,
            text: "What is your favourite color?"
        },
    ]

    return (
        <div className="flex-1 w-full h-full relative py-6">
            <button
                className="cursor-pointer absolute top-1 right-4"
                onClick={handleStop}
            >
                <X strokeWidth={2} color="#79747E" />
            </button>
            {isRecording ? (
                <div className="flex flex-col items-center mt-2.5">
                    <div className="relative w-[328px] h-[328px]">
                        <video
                            ref={videoPreviewRef}
                            autoPlay
                            muted
                            playsInline
                            className="w-full h-full object-cover rounded-lg"
                        />
                        {/* Grid overlay — 9 boxes */}
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none rounded-lg">
                            <div className="border-r border-b border-white/30" />
                            <div className="border-r border-b border-white/30" />
                            <div className="border-b border-white/30" />
                            <div className="border-r border-b border-white/30" />
                            {/* 5th box — countdown lives here */}
                            <div className="border-r border-b border-white/30 flex items-center justify-center">
                                {countdown !== null && countdown > 0 && (
                                    <span
                                        key={fadeKey}
                                        className="text-white text-4xl font-bold pointer-events-none select-none"
                                        style={{
                                            animation: "countdownFade 1s ease-out forwards",
                                        }}
                                    >
                                        {countdown}
                                    </span>
                                )}
                            </div>
                            <div className="border-b border-white/30" />
                            <div className="border-r border-white/30" />
                            <div className="border-r border-white/30" />
                            <div />
                        </div>
                        {countdown && <div className="absolute top-4 left-4 flex items-center bg-inverse-surface rounded-4xl gap-0.5 p-1">
                            <div className="size-3 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-white font-mono leading-0">
                                {/* {formatTime(duration)} */}Rec
                            </span>
                        </div>}
                        {/* question tab */}
                        {countdown == null && <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[270px] rounded-2xl px-5 pt-[25px] pb-[15px] bg-gradient">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-error h-5 rounded-b-2xl px-3 py-px">
                                <p className="label-small-primary text-white">{questions.length}</p>
                            </div>
                            <p className="body-medium-emphasized">What is your name?</p>
                        </div>}
                        <div className=" absolute top-0 left-0 flex flex-col items-center gap-4">
                            <CircularProgress
                                value={progress}
                                showLabel
                                size={100}
                                strokeWidth={8}
                                renderLabel={(v) => `${v}%`}
                                labelClassName="text-lg font-semibold"
                            />
                            <button onClick={() => setProgress((p) => Math.min(p + 10, 100))}>
                                Increase
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-full w-full flex flex-col items-center justify-center">
                    <p className="headline-small-emphasized">Record a video?</p>
                    <p className="body-medium">We'll ask a few short questions and record a brief video to understand your natural reactions.</p>
                    <div className="grid grid-cols-3 divide-x divide-tertiary-container gap-4 my-6">
                        {iconData.map((item) => (
                            <div key={item.id} className="flex flex-col justify-center items-center gap-2 px-4">
                                <Icon>
                                    {item.icon}
                                </Icon>
                                <p className="body-small-primary text-on-surface-variant">{item.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-center">
                        <Button
                            variant="default"
                            className="w-56.25"
                            onClick={handleStart}
                        >
                            <VideoCam />
                            Start record video
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}