import { SavedRoadmap, UserData } from "@/lib/types";
import Link from "next/link";
import RoadmapOwner from "./RoadmapOwner";

interface RoadmapItemProps {
  roadmap: SavedRoadmap;
  user?: UserData;
}

export default function RoadmapItem({ roadmap, user }: RoadmapItemProps) {
  const completedSteps = roadmap.completedSteps || [];
  const totalSteps = roadmap.steps?.length || 0;
  const progressPercentage =
    totalSteps > 0 ? Math.round((completedSteps.length / totalSteps) * 100) : 0;

  const createdAtString = new Date(roadmap.createdAt).toLocaleDateString();

  return (
    <Link href={`/roadmaps/${roadmap.id}`}>
      <div className="cursor-pointer rounded-lg border border-amber-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl dark:border-amber-800/50 dark:bg-amber-950/50">
        <h2 className="mb-2 text-xl font-semibold text-amber-900 dark:text-amber-100">
          {roadmap.title}
        </h2>
        {user && <RoadmapOwner roadmapOwner={user} />}
        {roadmap.tags && roadmap.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {roadmap.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-800/30 dark:text-amber-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className="mb-4 text-amber-800/70 dark:text-amber-200/70">
          Started at: {createdAtString}
        </p>
        <div className="flex items-center justify-between">
          <div className="mr-4 h-2 flex-1 rounded-full bg-amber-200/50 dark:bg-amber-800/30">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
            {progressPercentage}%
          </span>
        </div>
      </div>
    </Link>
  );
}
