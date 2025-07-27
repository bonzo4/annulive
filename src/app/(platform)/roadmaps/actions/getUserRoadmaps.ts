"use server";

import { auth0 } from "@/lib/auth0";
import { appConfig } from "@/lib/config";
import { SavedRoadmap } from "@/lib/types";

export async function getUserRoadmaps(): Promise<{
  ok: boolean;
  roadmaps?: SavedRoadmap[];
  error?: string;
}> {
  try {
    const session = await auth0.getSession();

    if (!session?.user) {
      return {
        ok: false,
        error: "Not authenticated",
      };
    }

    const response = await fetch(
      `${appConfig.servicesEndpoint}/roadmaps/getUserRoadmaps?userId=${encodeURIComponent(session.user.sub)}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Get roadmaps error:", errorText);
      return {
        ok: false,
        error: `Failed to get roadmaps: ${response.status} ${response.statusText}`,
      };
    }

    const result = await response.json();

    if (!result.ok) {
      return {
        ok: false,
        error: result.error || "Failed to get roadmaps",
      };
    }

    return {
      ok: true,
      roadmaps: result.roadmaps || [],
    };
  } catch (error) {
    console.error("Error getting roadmaps:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
