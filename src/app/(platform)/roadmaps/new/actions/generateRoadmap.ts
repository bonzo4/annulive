"use server";

import { appConfig } from "@/lib/config";
import { RoadmapFormData } from "../components/RoadmapForm";
import { RoadmapResponse } from "../../../../../lib/types";

export async function generateRoadmap({
  skill,
  timeframe,
  resourceTypes,
}: RoadmapFormData): Promise<RoadmapResponse> {
  try {
    if (!skill?.trim()) {
      return {
        ok: false,
        error: "Skill is required",
      };
    }

    const uri = appConfig.servicesEndpoint + "/ai/generateRoadmap";

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skillData: skill.trim(),
        timeframe: timeframe || undefined,
        resourceTypes: resourceTypes.length > 0 ? resourceTypes : undefined,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI service error:", errorText);
      return {
        ok: false,
        error: `Failed to generate roadmap: ${response.status} ${response.statusText}`,
      };
    }

    const data = await response.json();

    if (!data.ok) {
      return {
        ok: false,
        error: data.error || "Unknown error occurred",
      };
    }

    return {
      ok: true,
      content: data.content,
    };
  } catch (error) {
    console.error("Error generating roadmap:", error);

    if (error instanceof Error && error.name === "AbortError") {
      return {
        ok: false,
        error: "Request timed out after 20 seconds. Please try again.",
      };
    }

    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
