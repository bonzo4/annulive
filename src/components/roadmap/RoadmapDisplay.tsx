import { RoadmapData, SavedRoadmap, UserData } from "@/lib/types";
import { useState } from "react";
import RoadmapStep from "./RoadmapStep";
import Button from "../ui/Button";
import ProgressBar from "./ProgressBar";
import { useUser } from "@/contexts/UserContext";
import { saveRoadmapToAccount } from "@/app/(platform)/roadmaps/actions/saveRoadmap";
import { editRoadmap } from "@/app/(platform)/roadmaps/actions/editRoadmap";
import { useRouter } from "next/navigation";
import RoadmapOwner from "./RoadmapOwner";
import { clearCurrentRoadmapFromStorage } from "@/lib/localStorage";

interface RoadmapDisplayProps {
  roadmap: RoadmapData | SavedRoadmap;
  isPreview?: boolean;
  handleLogin: () => void;
  roadmapOwner?: UserData | null;
}

export default function RoadmapDisplay({
  roadmap,
  isPreview = false,
  handleLogin,
  roadmapOwner,
}: RoadmapDisplayProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(
    new Set("completedSteps" in roadmap ? roadmap.completedSteps : []),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const { userData, isAuthenticated } = useUser();
  const router = useRouter();

  const toggleStepCompletion = (stepIndex: number) => {
    setCompletedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(stepIndex)) {
        newSet.delete(stepIndex);
      } else {
        newSet.add(stepIndex);
      }

      if (
        "id" in roadmap &&
        isAuthenticated &&
        userData?.id === roadmap.userId
      ) {
        setTimeout(async () => {
          try {
            await editRoadmap({
              roadmapId: roadmap.id,
              completedSteps: Array.from(newSet),
            });
          } catch (error) {
            console.error("Failed to auto-save progress:", error);
          }
        }, 500);
      }

      return newSet;
    });
  };

  const handleSaveToAccount = async () => {
    if (!isAuthenticated) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const result = await saveRoadmapToAccount({
        title: roadmap.title,
        steps: roadmap.steps,
        tags: roadmap.tags,
        totalTimeframe: roadmap.totalTimeframe,
      });

      if (!result.ok) {
        setSaveError(result.error || "Failed to save roadmap");
      } else {
        clearCurrentRoadmapFromStorage();
        router.push(
          "/roadmaps" + (result.roadmap ? `/${result.roadmap.id}` : ""),
        );
      }
    } catch (error) {
      console.error("Failed to save roadmap to account:", error);
      setSaveError("An unexpected error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  };

  const progressPercentage = (completedSteps.size / roadmap.steps.length) * 100;

  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-white p-4 shadow-xl sm:p-8">
      <div className="mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
              {roadmap.title || "Your Learning Roadmap"}
            </h2>
            {roadmapOwner && (
              <RoadmapOwner roadmapOwner={roadmapOwner} userData={userData} />
            )}
            <p className="text-gray-600">
              Track your progress through this personalized learning path
            </p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span className="text-sm text-gray-500">
                Total Duration: <strong>{roadmap.totalTimeframe}</strong>
              </span>
              <span className="text-sm text-gray-500">
                Progress:{" "}
                <strong>
                  {completedSteps.size}/{roadmap.steps.length} layers
                </strong>
              </span>
              <div className="flex flex-wrap gap-2">
                {roadmap.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <ProgressBar progressPercentage={progressPercentage} />
          </div>
          {isPreview && (
            <div className="flex flex-col gap-2 lg:flex-shrink-0">
              {isAuthenticated ? (
                <Button
                  onClick={handleSaveToAccount}
                  disabled={isSaving}
                  variant="primary"
                >
                  {isSaving ? "Saving..." : "Save to Account"}
                </Button>
              ) : (
                <Button onClick={handleLogin} variant="secondary">
                  Log in to Save
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {saveError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-800">
            <strong>Save Error:</strong> {saveError}
          </p>
          <button
            onClick={() => setSaveError(null)}
            className="mt-1 text-xs text-red-600 underline hover:text-red-800"
          >
            Dismiss
          </button>
        </div>
      )}

      {updateError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-800">
            <strong>Update Error:</strong> {updateError}
          </p>
          <button
            onClick={() => setUpdateError(null)}
            className="mt-1 text-xs text-red-600 underline hover:text-red-800"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="border-t border-gray-200 pt-6">
        <div className="space-y-6">
          {roadmap.steps.map((step, index) => (
            <RoadmapStep
              key={index}
              index={index}
              completedSteps={completedSteps}
              step={step}
              toggleStepCompletion={toggleStepCompletion}
              isPreview={isPreview}
            />
          ))}
        </div>
      </div>

      {!isPreview && (
        <div className="mt-8 rounded-lg bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            <strong>Tip:</strong> Click on the layer numbers to mark them as
            completed and track your progress.
            {progressPercentage === 100 && (
              <span className="mt-1 block font-semibold text-green-800">
                🎉 Congratulations! You&apos;ve completed your learning trunk
                track!
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
