
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showPercentage?: boolean;
  color?: string;
}

const ProgressBar = ({
  value,
  max,
  className,
  showPercentage = false,
  color = "bg-primary",
}: ProgressBarProps) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
        <div
          className={cn("h-full", color)}
          style={{
            width: `${percentage}%`,
            transition: "width 0.5s ease-in-out",
          }}
        />
      </div>
      {showPercentage && (
        <div className="text-xs text-muted-foreground mt-1 text-right">
          {percentage}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
