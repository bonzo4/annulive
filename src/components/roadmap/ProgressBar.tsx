interface ProgressBarProps {
  progressPercentage: number;
}

export default function ProgressBar({ progressPercentage }: ProgressBarProps) {
  return (
    <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
      <div
        className="h-2 rounded-full bg-amber-600 transition-all duration-300 ease-in-out"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
}
