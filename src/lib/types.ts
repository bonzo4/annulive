export interface RoadmapStepData {
  title: string;
  resources: string[];
  timeframe: string;
  completionCheck: string;
  optional: boolean;
}

export interface RoadmapData {
  steps: RoadmapStepData[];
  tags: string[];
  totalTimeframe: string;
}

export interface RoadmapResponse {
  ok: boolean;
  content?: string;
  error?: string;
}
