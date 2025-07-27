"use server";

import { appConfig } from "@/lib/config";
import { SavedRoadmap } from "@/lib/types";

export async function getRoadmap(roadmapId: string): Promise<{
  ok: boolean;
  roadmap?: SavedRoadmap;
  error?: string;
}> {
  try {
    const response = await fetch(
      `${appConfig.servicesEndpoint}/roadmaps/getRoadmap?roadmapId=${encodeURIComponent(roadmapId)}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Get roadmap error:", errorText);
      return {
        ok: false,
        error: `Failed to get roadmap: ${response.status} ${response.statusText}`,
      };
    }

    const result = await response.json();

    if (!result.ok) {
      return {
        ok: false,
        error: result.error || "Failed to get roadmap",
      };
    }

    return {
      ok: true,
      roadmap: result.roadmap,
    };
  } catch (error) {
    console.error("Error getting roadmap:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
