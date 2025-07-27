import Link from "next/link";

interface RoadmapItemProps {
  id: string;
  title: string;
  description: string;
  progressPercentage: number;
}

export default function RoadmapItem({
  id,
  title,
  description,
  progressPercentage,
}: RoadmapItemProps) {
  return (
    <Link href={`/roadmaps/${id}`}>
      <div className="cursor-pointer rounded-lg border border-amber-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl dark:border-amber-800/50 dark:bg-amber-950/50">
        <h2 className="mb-2 text-xl font-semibold text-amber-900 dark:text-amber-100">
          {title}
        </h2>
        <p className="mb-4 text-amber-800/70 dark:text-amber-200/70">
          {description}
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
