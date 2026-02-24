import CircularProgress from "@/components/charts/CircularProgress";
import { DerivedMetric } from "@/global-types";

export default function ScorePageProgress({
  // level,
  // progress,
  score,
  level,
  title,
}: {
  // level: "low" | "moderate" | "high";
  // progress: number;
  title: string;
} & Pick<DerivedMetric, "level" | "score">) {
  return (
    <div className="flex flex-col items-center gap-1">
      {/* {JSON.stringify({ level, score, title })} */}
      <CircularProgress level={level} progress={score} />
      <p className="level-small-primary capitalize">
        {title.split("_").join(" ")}
      </p>
    </div>
  );
}
