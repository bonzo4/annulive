"use server";

import { auth0 } from "@/lib/auth0";
import { appConfig } from "@/lib/config";
import { SavedRoadmap, RoadmapStepData } from "@/lib/types";

interface EditRoadmapRequest {
  roadmapId: string;
  title?: string;
  steps?: RoadmapStepData[];
  tags?: string[];
  totalTimeframe?: string;
  completedSteps?: number[];
}

interface RoadmapUpdateData {
  title?: string;
  steps?: RoadmapStepData[];
  tags?: string[];
  totalTimeframe?: string;
  completedSteps?: number[];
}

interface EditRoadmapResponse {
  ok: boolean;
  roadmap?: SavedRoadmap;
  error?: string;
}

export async function editRoadmap(
  data: EditRoadmapRequest,
): Promise<EditRoadmapResponse> {
  try {
    const session = await auth0.getSession();

    if (!session?.user) {
      return {
        ok: false,
        error: "Not authenticated",
      };
    }

    const roadmapData: RoadmapUpdateData = {};

    if (data.title !== undefined) {
      roadmapData.title = data.title;
    }
    if (data.steps !== undefined) {
      roadmapData.steps = data.steps;
    }
    if (data.tags !== undefined) {
      roadmapData.tags = data.tags;
    }
    if (data.totalTimeframe !== undefined) {
      roadmapData.totalTimeframe = data.totalTimeframe;
    }
    if (data.completedSteps !== undefined) {
      roadmapData.completedSteps = data.completedSteps;
    }

    if (Object.keys(roadmapData).length === 0) {
      return {
        ok: false,
        error: "No fields provided to update",
      };
    }

    const requestBody = {
      roadmapId: data.roadmapId,
      userId: session.user.sub,
      roadmapData,
    };

    const response = await fetch(
      `${appConfig.servicesEndpoint}/roadmaps/editRoadmap`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Edit roadmap error:", errorText);

      if (response.status === 403) {
        return {
          ok: false,
          error: "You are not authorized to edit this roadmap",
        };
      }
      if (response.status === 404) {
        return {
          ok: false,
          error: "Roadmap not found",
        };
      }

      return {
        ok: false,
        error: `Failed to edit roadmap: ${response.status} ${response.statusText}`,
      };
    }

    const result = await response.json();

    if (!result.ok) {
      return {
        ok: false,
        error: result.error || "Failed to edit roadmap",
      };
    }

    return {
      ok: true,
      roadmap: result.roadmap,
    };
  } catch (error) {
    console.error("Error editing roadmap:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
