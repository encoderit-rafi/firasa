const CircularProgress = ({
  size = 96,
  strokeWidth = 12,
  progress = 50,
  label = "Moderate",
  gradientStart = "rgba(250, 204, 21, 0)", // transparent yellow
  gradientEnd = "#FACC15", // solid yellow
  bgColor = "rgba(22, 163, 74, 0.05)",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative flex flex-col items-center justify-center size-full"
      //   style={{ width: size, height: size + 40 }}
    >
      {/* SVG Container with rotation to start at ~7:30 o'clock */}
      <div
        className="relative transform rotate-150 size-full"
        // style={{ width: size, height: size }}
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
              <stop offset="0%" stopColor={gradientEnd} />
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
      {/* <div className="absolute inset-0 flex items-center justify-center pb-10">
        <span className="font-bold text-[#1F2937] tracking-tighter">
          {progress}%
        </span>
      </div> */}

      {/* Label Pill */}
      {/* {label && (
        <div className="absolute bottom-0 bg-[#FACC15] px-10 py-3 rounded-full shadow-sm transform translate-y-2">
          <span className="font-bold text-[#1F2937]">{label}</span>
        </div>
      )} */}
    </div>
  );
};

export default CircularProgress;
