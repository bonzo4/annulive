"use client";

import { useState } from "react";
import RoadmapForm from "./components/RoadmapForm";
import RoadmapDisplay from "@/components/roadmap/RoadmapDisplay";
import RoadmapError from "@/components/roadmap/RoadmapError";

export default function NewRoadmap() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roadmapContent, setRoadmapContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRoadmapGenerated = (content: string) => {
    setRoadmapContent(content);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setRoadmapContent(null);
  };

  const handleCreateNew = () => {
    setRoadmapContent(null);
    setError(null);
  };

  const handleRetry = () => {
    setError(null);
  };

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row justify-between space-x-10">
        <h1 className="mb-6 text-3xl font-bold text-amber-900 dark:text-amber-100">
          New Roadmap
        </h1>
      </div>

      <div className="relative">
        {isSubmitting && (
          <div className="flex items-center justify-center rounded-2xl bg-white p-12 shadow-xl">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600"></div>
              <p className="text-lg font-medium text-amber-900">
                Creating your personalized roadmap...
              </p>
              <p className="text-sm text-amber-700">
                This may take a few moments while our AI analyzes your
                requirements.
              </p>
            </div>
          </div>
        )}

        {!isSubmitting && !roadmapContent && !error && (
          <RoadmapForm
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            onRoadmapGenerated={handleRoadmapGenerated}
            onError={handleError}
          />
        )}

        {!isSubmitting && roadmapContent && (
          <RoadmapDisplay
            content={roadmapContent}
            onCreateNew={handleCreateNew}
          />
        )}

        {!isSubmitting && error && (
          <RoadmapError
            error={error}
            onRetry={handleRetry}
            onCreateNew={handleCreateNew}
          />
        )}
      </div>
    </div>
  );
}
