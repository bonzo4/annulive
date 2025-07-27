import { RoadmapData, RoadmapStepData } from "./types";

const ROADMAP_STORAGE_KEY = "annulive_current_roadmap";

export interface LocalStorageRoadmap {
  title: string;
  steps: RoadmapStepData[];
  tags: string[];
  totalTimeframe: string;
  createdAt: string;
  completedSteps: number[];
}

export function saveCurrentRoadmapToStorage(roadmapData: {
  title: string;
  steps: RoadmapStepData[];
  tags: string[];
  totalTimeframe: string;
}): void {
  if (typeof window === "undefined") return;

  try {
    const currentRoadmap: LocalStorageRoadmap = {
      title: roadmapData.title,
      steps: roadmapData.steps,
      tags: roadmapData.tags,
      totalTimeframe: roadmapData.totalTimeframe,
      createdAt: new Date().toISOString(),
      completedSteps: [],
    };

    localStorage.setItem(ROADMAP_STORAGE_KEY, JSON.stringify(currentRoadmap));
  } catch (error) {
    console.error("Failed to save roadmap to local storage:", error);
  }
}

export function loadCurrentRoadmapFromStorage(): RoadmapData | null {
  if (typeof window === "undefined") return null;

  try {
    const storedData = localStorage.getItem(ROADMAP_STORAGE_KEY);
    if (!storedData) return null;

    return JSON.parse(storedData);
  } catch (error) {
    console.error("Failed to load roadmap from local storage:", error);
    return null;
  }
}

export function clearCurrentRoadmapFromStorage(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(ROADMAP_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear roadmap from local storage:", error);
  }
}
