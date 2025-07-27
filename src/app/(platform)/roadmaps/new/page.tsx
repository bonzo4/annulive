"use client";

import { useState, useEffect } from "react";
import RoadmapForm from "./components/RoadmapForm";
import RoadmapError from "@/components/roadmap/RoadmapError";
import {
  saveCurrentRoadmapToStorage,
  loadCurrentRoadmapFromStorage,
  clearCurrentRoadmapFromStorage,
} from "@/lib/localStorage";
import RoadmapDisplay from "@/components/roadmap/RoadmapDisplay";
import { RoadmapData } from "@/lib/types";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function NewRoadmap() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedRoadmap = loadCurrentRoadmapFromStorage();
    if (savedRoadmap) {
      setRoadmap(savedRoadmap);
    }
  }, []);

  const handleRoadmapGenerated = (roadmap: RoadmapData) => {
    setRoadmap(roadmap);
    setError(null);

    try {
      saveCurrentRoadmapToStorage({
        title: roadmap.title || "Learning Roadmap",
        steps: roadmap.steps || [],
        tags: roadmap.tags || [],
        totalTimeframe: roadmap.totalTimeframe || "Unknown",
      });
    } catch (error) {
      console.error("Failed to parse roadmap content for storage:", error);
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setRoadmap(null);
  };

  const handleCreateNew = () => {
    setRoadmap(null);
    setError(null);

    clearCurrentRoadmapFromStorage();
  };

  const handleRetry = () => {
    setError(null);
  };

  const handleLogin = () => {
    router.push("/auth/login?returnTo=/roadmaps/new");
  };

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row justify-between space-x-10">
        <h1 className="mb-6 text-3xl font-bold text-amber-900 dark:text-amber-100">
          New Trunk Track
        </h1>
        {roadmap && (
          <Button onClick={handleCreateNew} variant="outline">
            Create New Trunk Track
          </Button>
        )}
      </div>

      <div className="relative">
        {isSubmitting && (
          <div className="flex items-center justify-center rounded-2xl bg-white p-12 shadow-xl">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600"></div>
              <p className="text-lg font-medium text-amber-900">
                Creating your personalized trunk track...
              </p>
              <p className="text-sm text-amber-700">
                This may take a few moments while our AI analyzes your
                requirements.
              </p>
            </div>
          </div>
        )}

        {!isSubmitting && !roadmap && !error && (
          <RoadmapForm
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            onRoadmapGenerated={handleRoadmapGenerated}
            onError={handleError}
          />
        )}

        {!isSubmitting && roadmap && (
          <RoadmapDisplay
            roadmap={roadmap}
            isPreview={true}
            handleLogin={handleLogin}
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
