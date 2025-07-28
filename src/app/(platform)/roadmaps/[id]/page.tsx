"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { getRoadmap } from "../actions/getRoadmap";
import { SavedRoadmap, UserData } from "@/lib/types";
import RoadmapDisplay from "@/components/roadmap/RoadmapDisplay";
import RoadmapError from "@/components/roadmap/RoadmapError";
import { getUser } from "@/lib/db/getUser";
import LoadingIcon from "@/components/ui/Loader";

export default function RoadmapPage() {
  const params = useParams();
  const router = useRouter();
  const { userData, isAuthenticated } = useUser();
  const [roadmap, setRoadmap] = useState<SavedRoadmap | null>(null);
  const [roadmapOwner, setRoadmapOwner] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const roadmapId = params.id as string;

  useEffect(() => {
    async function fetchRoadmap() {
      if (!roadmapId) {
        setError("Invalid roadmap ID");
        setLoading(false);
        return;
      }

      try {
        const result = await getRoadmap(roadmapId);

        if (result.ok && result.roadmap) {
          setRoadmap(result.roadmap);

          // Fetch the roadmap owner's information if userId exists
          if (result.roadmap.userId) {
            try {
              console.log("Fetching owner for roadmap:", result.roadmap.userId);
              const owner = await getUser({ userId: result.roadmap.userId });
              setRoadmapOwner(owner);
            } catch (ownerError) {
              console.error("Error fetching roadmap owner:", ownerError);
              // Don't fail the whole page if we can't fetch owner info
            }
          }
        } else {
          setError(result.error || "Failed to load roadmap");
        }
      } catch (err) {
        console.error("Error fetching roadmap:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchRoadmap();
  }, [roadmapId]);

  const handleCreateNew = () => {
    router.push("/roadmaps/new");
  };

  const handleLogin = () => {
    router.push("/auth/login?returnTo=/roadmaps/" + roadmapId);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingIcon text="Loading roadmap..." />
      </div>
    );
  }

  if (error || !roadmap) {
    return (
      <RoadmapError
        title="Roadmap Not Found"
        error={error || "The requested roadmap could not be found"}
        onCreateNew={handleCreateNew}
        showTroubleshooting={false}
      />
    );
  }

  const isOwner = isAuthenticated && userData?.id === roadmap.userId;

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row justify-between space-x-10">
        <h1 className="mb-6 text-3xl font-bold text-amber-900 dark:text-amber-100">
          {roadmap.title || "Roadmap Details"}
        </h1>
      </div>

      <RoadmapDisplay
        roadmap={roadmap}
        isPreview={!isOwner}
        handleLogin={handleLogin}
        roadmapOwner={roadmapOwner}
      />
    </div>
  );
}
