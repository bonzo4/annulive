"use server";

import { appConfig } from "@/lib/config";
import { SavedRoadmapWithUser } from "@/lib/types";

export interface GetRoadmapsOptions {
  limit?: number;
  page?: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export async function getRoadmaps(options: GetRoadmapsOptions = {}): Promise<{
  ok: boolean;
  roadmaps?: SavedRoadmapWithUser[];
  pagination?: PaginationInfo;
  error?: string;
}> {
  try {
    const { limit = 10, page = 1 } = options;

    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
    });

    const response = await fetch(
      `${appConfig.servicesEndpoint}/roadmaps/getRoadmaps?${queryParams}`,
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
      pagination: result.pagination,
    };
  } catch (error) {
    console.error("Error getting roadmaps:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
