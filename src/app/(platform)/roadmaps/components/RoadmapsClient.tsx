"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import RoadmapItem from "@/components/roadmap/RoadmapItem";
import Button from "@/components/ui/Button";
import { useUser } from "@/contexts/UserContext";
import { getUserRoadmaps } from "../actions/getUserRoadmaps";
import { SavedRoadmap } from "@/lib/types";

export default function RoadmapsClient() {
  const { userData, isAuthenticated } = useUser();
  const [roadmaps, setRoadmaps] = useState<SavedRoadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRoadmaps();
    }
  }, [isAuthenticated]);

  const fetchRoadmaps = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getUserRoadmaps();

      if (result.ok && result.roadmaps) {
        setRoadmaps(result.roadmaps);
      } else {
        setError(result.error || "Failed to fetch roadmaps");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-100">
          Welcome to Annulive
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-amber-800/70 dark:text-amber-200/70">
          Create personalized learning roadmaps to master any skill. Get started
          by creating your first trunk track to see how our platform works.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/roadmaps/new">
            <Button size="lg">Create Your First Trunk Track</Button>
          </Link>
          <Link
            href={`/auth/login?returnTo=${process.env.NEXT_PUBLIC_APP_BASE_URL}/roadmaps`}
          >
            <Button variant="outline" size="lg">
              Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row justify-between space-x-10">
        <h1 className="mb-6 text-3xl font-bold text-amber-900 dark:text-amber-100">
          {userData?.name
            ? `${userData.name}'s Trunk Tracks`
            : "Your Trunk Tracks"}
        </h1>
        <div className="flex gap-2">
          <Link href="/roadmaps/new">
            <Button>New Trunk Track</Button>
          </Link>
        </div>
      </div>

      {loading && (
        <div className="py-8 text-center">
          <p className="text-amber-700 dark:text-amber-300">
            Loading your roadmaps...
          </p>
        </div>
      )}

      {error && (
        <div className="py-8 text-center">
          <p className="text-red-600 dark:text-red-400">Error: {error}</p>
          <Button variant="outline" onClick={fetchRoadmaps} className="mt-4">
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-6">
          {roadmaps.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <p className="mb-4 text-amber-700 dark:text-amber-300">
                You haven&apos;t created any trunk tracks yet.
              </p>
              <Link href="/roadmaps/new">
                <Button>Create Your First Trunk Track</Button>
              </Link>
            </div>
          ) : (
            roadmaps.map((roadmap) => {
              return <RoadmapItem key={roadmap.id} roadmap={roadmap} />;
            })
          )}
        </div>
      )}
    </div>
  );
}
