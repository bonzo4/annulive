interface RoadmapErrorProps {
  title?: string;
  error: string;
  onRetry?: () => void;
  onCreateNew?: () => void;
  showTroubleshooting?: boolean;
}

export default function RoadmapError({
  title = "Failed to Generate Trunk Track",
  error,
  onRetry,
  onCreateNew,
  showTroubleshooting = true,
}: RoadmapErrorProps) {
  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-red-200 bg-red-50 p-8 shadow-xl">
      <div className="mb-4 flex items-center">
        <div className="flex-shrink-0">
          <svg
            className="h-8 w-8 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-red-800">{title}</h3>
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-2 text-red-700">
          We encountered an error while processing your request:
        </p>
        <p className="rounded-lg bg-red-100 p-3 text-sm text-red-600">
          {error}
        </p>
      </div>

      <div className="flex space-x-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
          >
            Try Again
          </button>
        )}
        {onCreateNew && (
          <button
            onClick={onCreateNew}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
          >
            Create New Trunk Track
          </button>
        )}
      </div>

      {showTroubleshooting && (
        <div className="mt-6 rounded-lg bg-yellow-50 p-4">
          <p className="text-sm text-yellow-800">
            <strong>Troubleshooting Tips:</strong>
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-yellow-700">
            <li>Make sure your skill description is clear and specific</li>
            <li>Check your internet connection</li>
            <li>
              Try again in a few moments if the service is temporarily
              unavailable
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
