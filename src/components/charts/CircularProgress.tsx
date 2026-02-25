import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { TLevel } from "@/global-types";

type CircularProgressProps = {
  size?: number;
  strokeWidth?: number;
  progress?: number;
  // level: "moderate" | "high" | "low";
  level: TLevel;
  gradient?: string;
  className?: string;
};

const CircularProgress = ({
  size = 85,
  strokeWidth = 10,
  progress = 50,
  level,
  className,
}: CircularProgressProps) => {
  const bgColor = "rgba(22, 163, 74, 0.05)";
  const transparent = "rgba(255, 255, 255, 0)";
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Number(progress) / 100) * circumference;
  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        className="relative rotate-150 transform"
        style={{ width: size, height: size }}
      >
        <svg className="size-full">
          <defs>
            <linearGradient id={`progressGradient-low`} x1="0%" x2="100%">
              <stop offset="0%" stopColor={"#ef4444"} />
              <stop offset="100%" stopColor={transparent} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id={`progressGradient-moderate`} x1="0%" x2="100%">
              <stop offset="0%" stopColor={"#facc15"} />
              <stop offset="100%" stopColor={transparent} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id={`progressGradient-high`} x1="0%" x2="100%">
              <stop offset="0%" stopColor={"#22c55e"} />
              <stop offset="100%" stopColor={transparent} />
            </linearGradient>
          </defs>

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={bgColor}
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#progressGradient-${level?.toLowerCase()})`}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn("title-large-emphasized", className)}>
          {progress}%
        </span>
      </div>

      {level && (
        <Badge
          variant={level.toLowerCase() as "low" | "moderate" | "high"}
          className="absolute bottom-0"
        >
          {level}
        </Badge>
      )}
    </div>
  );
};

export default CircularProgress;
