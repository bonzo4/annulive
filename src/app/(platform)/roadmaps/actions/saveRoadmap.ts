"use server";

import { auth0 } from "@/lib/auth0";
import { appConfig } from "@/lib/config";
import { SavedRoadmap, RoadmapStepData } from "@/lib/types";

interface SaveRoadmapRequest {
  title: string;
  steps: RoadmapStepData[];
  tags: string[];
  totalTimeframe: string;
}

interface SaveRoadmapResponse {
  ok: boolean;
  roadmap?: SavedRoadmap;
  error?: string;
}

export async function saveRoadmapToAccount(
  data: SaveRoadmapRequest,
): Promise<SaveRoadmapResponse> {
  try {
    const session = await auth0.getSession();

    if (!session?.user) {
      return {
        ok: false,
        error: "Not authenticated",
      };
    }

    const roadmapData = {
      title: data.title,
      steps: data.steps,
      tags: data.tags,
      totalTimeframe: data.totalTimeframe,
      userId: session.user.sub,
    };

    const response = await fetch(
      `${appConfig.servicesEndpoint}/roadmaps/saveRoadmap`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: appConfig.serviceSecret,
        },
        body: JSON.stringify({ roadmapData }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Save roadmap error:", errorText);
      return {
        ok: false,
        error: `Failed to save roadmap: ${response.status} ${response.statusText}`,
      };
    }

    const result = await response.json();

    if (!result.ok) {
      return {
        ok: false,
        error: result.error || "Failed to save roadmap",
      };
    }

    return {
      ok: true,
      roadmap: result.roadmap,
    };
  } catch (error) {
    console.error("Error saving roadmap:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
