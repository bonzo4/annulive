import { ArrowRight, TreesIcon } from "lucide-react";
import { TreeRing } from "./TreeRing";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <TreeRing size="w-20 h-20" className="mx-auto mb-8" />
        <h3 className="mb-4 text-3xl font-bold text-amber-900 sm:text-4xl dark:text-amber-100">
          Ready to plant your first seed?
        </h3>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-amber-800/70 dark:text-amber-200/70">
          Join thousands of learners who are growing their skills, one layer at
          a time.
        </p>
        <Link href="/roadmaps">
          <Button size="lg" className="mx-auto">
            <TreesIcon className="h-6 w-6" />
            Begin Your Journey
            <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
