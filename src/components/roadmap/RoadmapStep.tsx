import { RoadmapStepData } from "@/lib/types";

interface RoadmapStepProps {
  index: number;
  completedSteps: Set<number>;
  step: RoadmapStepData;
  toggleStepCompletion: (stepIndex: number) => void;
  isPreview: boolean;
}

export default function RoadmapStep({
  index,
  completedSteps,
  step,
  toggleStepCompletion,
  isPreview,
}: RoadmapStepProps) {
  const isCompleted = completedSteps.has(index);
  return (
    <div
      className={`rounded-lg border p-6 transition-all duration-200 ${
        step.optional
          ? "border-blue-200 bg-blue-50"
          : "border-gray-200 bg-gray-50"
      } ${isCompleted ? "opacity-75" : ""}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-3">
            <button
              onClick={
                isPreview ? undefined : () => toggleStepCompletion(index)
              }
              className={`flex h-8 min-h-8 w-8 min-w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                isCompleted
                  ? "bg-green-600 text-white"
                  : isPreview
                    ? "cursor-not-allowed bg-gray-400 text-white"
                    : "cursor-pointer bg-amber-600 text-white hover:bg-amber-700"
              }`}
            >
              {isCompleted ? "✓" : index + 1}
            </button>
            <h3
              className={`text-lg font-semibold ${isCompleted ? "text-gray-500 line-through" : "text-gray-900"}`}
            >
              {step.title}
            </h3>
            {step.optional && (
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                Optional
              </span>
            )}
          </div>
          <p className="mb-2 text-sm text-gray-600">
            Duration: <strong>{step.timeframe}</strong>
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="mb-2 text-sm font-medium text-gray-900">Resources:</h4>
        <ul className="space-y-2">
          {step.resources.map((resource, resourceIndex) => (
            <li
              key={resourceIndex}
              className="flex items-start gap-2 text-sm text-gray-700"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600"></span>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(resource)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {resource}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`rounded-lg border p-3 ${isCompleted ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"}`}
      >
        <h4 className="mb-1 text-sm font-medium text-gray-900">
          Completion Check:
        </h4>
        <p className="text-sm text-gray-700">{step.completionCheck}</p>
        {isCompleted && (
          <p className="mt-2 text-xs font-medium text-green-600">
            ✓ Completed!
          </p>
        )}
      </div>
    </div>
  );
}
