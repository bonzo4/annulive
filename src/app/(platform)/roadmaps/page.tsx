import Link from "next/link";
import RoadmapItem from "./components/RoadmapItem";
import Button from "@/components/ui/Button";

export default function Roadmaps() {
  return (
    <div>
      <div className="flex flex-row justify-between space-x-10">
        <h1 className="mb-6 text-3xl font-bold text-amber-900 dark:text-amber-100">
          Your Roadmaps
        </h1>
        <Link href="/roadmaps/new">
          <Button>New Roadmap</Button>
        </Link>
      </div>
      <div className="space-y-6">
        <RoadmapItem />
      </div>
    </div>
  );
}
