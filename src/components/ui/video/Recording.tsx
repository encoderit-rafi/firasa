"use client";

import { Button } from "../button";
import { RefObject, useState, useEffect, useCallback, useRef } from "react";
import { VideoCam } from "@/assets/icons";
import { X } from "lucide-react";
import Icon from "../icon";
import { CircularProgress } from "@/components/progress-08";

const RECORD_DURATION = 5;

interface RecordingProps {
    videoPreviewRef: RefObject<HTMLVideoElement | null>;
    startRecording: (timerDuration?: number | null) => Promise<MediaStream | null>;
    stopRecording: () => void;
    recordingStatusIdle: () => void;
    handleStartUpload: () => Promise<void>
}

export function Recording({
    videoPreviewRef,
    startRecording,
    stopRecording,
    recordingStatusIdle,
    handleStartUpload,
}: RecordingProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [countdownFinished, setCountdownFinished] = useState(false);
    const [fadeKey, setFadeKey] = useState(0);
    const [timerProgress, setTimerProgress] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(RECORD_DURATION);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);

    const questions = [
        { id: 1, text: "What is your name?" },
        { id: 2, text: "What is your age?" },
        { id: 3, text: "What do you like?" },
        { id: 4, text: "What is your favourite food?" },
        { id: 5, text: "What is your favourite color?" },
    ];

    const startQuestionTimer = useCallback(() => {
        startTimeRef.current = Date.now();
        setTimerProgress(0);
        setSecondsLeft(RECORD_DURATION);

        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            const elapsed = (Date.now() - startTimeRef.current) / 1000;
            const remaining = Math.max(0, RECORD_DURATION - elapsed);
            const progress = Math.min((elapsed / RECORD_DURATION) * 100, 100);

            setTimerProgress(progress);
            setSecondsLeft(Math.ceil(remaining));

            if (elapsed >= RECORD_DURATION) {
                if (timerRef.current) clearInterval(timerRef.current);
            }
        }, 100);
    }, []);

    const handleStart = useCallback(async () => {
        setCountdownFinished(false);
        setCurrentQuestionIndex(0);
        setIsRecording(true);
        const stream = await startRecording(null);
        if (stream && videoPreviewRef.current) {
            videoPreviewRef.current.srcObject = stream;
        }
        setCountdown(5);
        setFadeKey((k) => k + 1);
    }, [startRecording, videoPreviewRef]);

    // Countdown: 5 → 4 → 3 → 2 → 1 → 0
    useEffect(() => {
        if (countdown === null) return;

        if (countdown === 0) {
            setCountdown(null);
            setCountdownFinished(true);
            startQuestionTimer();
            return;
        }

        const timer = setTimeout(() => {
            setCountdown((prev) => (prev !== null ? prev - 1 : null));
            setFadeKey((k) => k + 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, startQuestionTimer]);

    // When timer reaches 100%, move to next question or stop
    useEffect(() => {
        if (timerProgress >= 100 && isRecording && countdownFinished) {
            if (currentQuestionIndex < questions.length - 1) {
                // Move to next question
                setCurrentQuestionIndex((prev) => prev + 1);
                startQuestionTimer();
            } else {
                // Last question done — stop recording
                handleStop();
            }
        }
    }, [timerProgress, isRecording, countdownFinished]);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const handleStop = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        if (isRecording) {
            stopRecording();
            handleStartUpload();
        }
        setIsRecording(false);
        setCountdown(null);
        setCountdownFinished(false);
        setTimerProgress(0);
        setSecondsLeft(RECORD_DURATION);
        setCurrentQuestionIndex(0);
        recordingStatusIdle();
    };

    const handleStopInBtn = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        if (isRecording) {
            stopRecording();
        }
        setIsRecording(false);
        setCountdown(null);
        setCountdownFinished(false);
        setTimerProgress(0);
        setSecondsLeft(RECORD_DURATION);
        setCurrentQuestionIndex(0);
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

    return (
        <div className="flex-1 w-full h-full relative py-6">
            <button
                className="cursor-pointer absolute top-1 right-4"
                onClick={handleStopInBtn}
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

                        {/* REC indicator — only during countdown */}
                        {countdown !== null && (
                            <div className="absolute top-4 left-4 flex items-center bg-inverse-surface rounded-4xl gap-0.5 p-1">
                                <div className="size-3 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-white font-mono leading-0">
                                    Rec
                                </span>
                            </div>
                        )}

                        {/* Question tab — only after countdown is fully done */}
                        {countdownFinished && (
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[270px] rounded-2xl px-5 pt-[25px] pb-[15px] bg-gradient">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-error h-5 rounded-b-2xl px-3 py-px">
                                    <p className="label-small-primary text-white">
                                        {currentQuestionIndex + 1}/{questions.length}
                                    </p>
                                </div>
                                <p className="body-medium-emphasized">
                                    {questions[currentQuestionIndex].text}
                                </p>
                            </div>
                        )}

                        {/* Circular progress timer — only after countdown is fully done */}
                        {countdownFinished && (
                            <div className="absolute bottom-3 left-3">
                                <CircularProgress
                                    value={timerProgress}
                                    showLabel
                                    size={70}
                                    strokeWidth={6}
                                    renderLabel={() => `${secondsLeft}s`}
                                    labelClassName="text-sm font-bold text-white"
                                />
                            </div>
                        )}

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