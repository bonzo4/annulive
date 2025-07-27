"use client";

import Link from "next/link";
import RoadmapItem from "./RoadmapItem";
import Button from "@/components/ui/Button";
import { useUser } from "@/contexts/UserContext";

export default function RoadmapsClient() {
  const { userData, isAuthenticated } = useUser();

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
        <div className="mt-12 max-w-4xl">
          <h2 className="mb-4 text-2xl font-semibold text-amber-900 dark:text-amber-100">
            See what a trunk track looks like
          </h2>
          <div className="space-y-6">
            <RoadmapItem />
          </div>
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
        <Link href="/roadmaps/new">
          <Button>New Trunk Track</Button>
        </Link>
      </div>
      <div className="space-y-6">
        <RoadmapItem />
      </div>
    </div>
  );
}
