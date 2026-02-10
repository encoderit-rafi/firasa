import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

type CircularProgressProps = {
  size?: number;
  strokeWidth?: number;
  progress?: number;
  label: "moderate" | "high" | "low";
  gradient?: string;
  className?: string;
};

const CircularProgress = ({
  size = 85,
  strokeWidth = 10,
  progress = 50,
  label,
  className,
}: CircularProgressProps) => {
  const bgColor = "rgba(22, 163, 74, 0.05)";
  const transparent = "rgba(255, 255, 255, 0)";
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <div
      className="relative flex flex-col items-center justify-center "
      style={{ width: size, height: size }}
    >
      <div
        className="relative transform rotate-150 "
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
            stroke={`url(#progressGradient-${label})`}
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

      {label && (
        <Badge variant={label} className="absolute bottom-0">
          {label}
        </Badge>
      )}
    </div>
  );
};

export default CircularProgress;
