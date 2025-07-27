/* eslint-disable @next/next/no-img-element */

import { UserData } from "@/lib/types";

interface RoadmapOwnerProps {
  roadmapOwner: UserData;
  userData?: UserData | null;
}

export default function RoadmapOwner({
  roadmapOwner,
  userData,
}: RoadmapOwnerProps) {
  return (
    <div className="mb-3 flex items-center gap-2">
      {roadmapOwner.picture && (
        <img
          src={roadmapOwner.picture}
          alt={roadmapOwner.name || "User"}
          width={24}
          height={24}
          className="h-6 w-6 rounded-full"
        />
      )}
      <span className="text-sm text-gray-600">
        Created by{" "}
        <span className="font-medium text-gray-900">
          {userData?.id === roadmapOwner.id
            ? "you"
            : roadmapOwner.name || "Anonymous User"}
        </span>
      </span>
    </div>
  );
}
