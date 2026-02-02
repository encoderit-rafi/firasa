type CircularProgressProps = {
  size?: number;
  strokeWidth?: number;
  progress?: number;
  label?: "moderate" | "high" | "low";
  gradient?: string;
};
const labelColors = {
  low: "#EF4444", // red
  moderate: "#FACC15", // yellow
  high: "#22C55E", // green
};

const CircularProgress = ({
  size = 96,
  strokeWidth = 12,
  progress = 50,
  label = "moderate",
}: CircularProgressProps) => {
  const activeColor = labelColors[label];
  const bgColor = "rgba(22, 163, 74, 0.05)";
  const gradientStart = "rgba(255, 255, 255, 0)"; // transparent
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative flex flex-col items-center justify-center "
      style={{ width: size, height: size }}
    >
      {/* SVG Container with rotation to start at ~7:30 o'clock */}
      <div
        className="relative transform rotate-150 "
        style={{ width: size, height: size }}
      >
        <svg className="size-full">
          <defs>
            {/* Linear gradient mapped to flow from start position */}
            <linearGradient
              id="progressGradient"
              x1="0%"
              //   y1="100%"
              x2="100%"
              //   y2="0%"
            >
              <stop offset="0%" stopColor={activeColor} />
              <stop offset="100%" stopColor={gradientStart} />
            </linearGradient>
          </defs>

          {/* Background circle */}
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
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
      </div>

      {/* Text Overlay (Percentage) - Fixed position (no rotation) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold text-[#1F2937] tracking-tighter">
          {progress}%
        </span>
      </div>

      {/* Label Pill */}
      {label && (
        <div
          className="absolute bottom-0 px-2 rounded-full shadow-sm transform "
          style={{ backgroundColor: activeColor }}
        >
          <span className="text-xs capitalize font-bold text-white">
            {label}
          </span>
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
