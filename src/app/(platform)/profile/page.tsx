/* eslint-disable @next/next/no-img-element */
"use client";

import { useUser } from "@/contexts/UserContext";

export default function Profile() {
  const { userData } = useUser();

  if (!userData) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-amber-800 dark:text-amber-200">Loading profile...</p>
      </div>
    );
  }

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-amber-900 dark:text-amber-100">
        Your Profile
      </h1>
      <div className="rounded-lg border border-amber-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-amber-800/50 dark:bg-amber-950/50">
        <div className="mb-6 flex items-center space-x-4">
          {userData.picture ? (
            <img
              src={userData.picture}
              alt={userData.name || "User"}
              width={80}
              height={80}
              className="h-20 w-20 rounded-full border-4 border-amber-200 object-cover dark:border-amber-600"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-400 dark:from-amber-700 dark:to-orange-700">
              <span className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                {getInitials(userData.name)}
              </span>
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {userData.name || "User"}
            </h2>
            <p className="text-amber-800/70 dark:text-amber-200/70">
              Annulive Member
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {userData.tags && userData.tags.length > 0 && (
            <div>
              <label className="mb-1 block text-sm font-medium text-amber-800 dark:text-amber-200">
                Interests & Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {userData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-amber-200 px-3 py-1 text-sm text-amber-900 dark:bg-amber-800 dark:text-amber-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {(!userData.tags || userData.tags.length === 0) && (
            <div>
              <label className="mb-1 block text-sm font-medium text-amber-800 dark:text-amber-200">
                Interests & Skills
              </label>
              <p className="text-amber-700/60 italic dark:text-amber-300/60">
                Start creating roadmaps to build your skill collection!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
