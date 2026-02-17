import CircularProgress from "@/components/charts/CircularProgress";

export default function ScorePageProgress({
  label,
  progress,
  title,
}: {
  label: "low" | "moderate" | "high";
  progress: number;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <CircularProgress label={label} progress={progress} />
      <p className="label-small-primary">{title}</p>
    </div>
  );
}
