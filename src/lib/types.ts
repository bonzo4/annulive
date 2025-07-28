export interface RoadmapStepData {
  title: string;
  resources: string[];
  timeframe: string;
  completionCheck: string;
  optional: boolean;
}

export interface RoadmapData {
  title: string;
  steps: RoadmapStepData[];
  tags: string[];
  totalTimeframe: string;
}

export interface UserData {
  id: string;
  name?: string;
  picture?: string;
  tags?: string[];
}

export interface SavedRoadmap {
  id: string;
  title: string;
  steps: RoadmapStepData[];
  tags: string[];
  totalTimeframe: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  completedSteps?: number[];
}

export interface SavedRoadmapWithUser extends SavedRoadmap {
  user?: UserData | null;
}
