import { ArrowRight } from "lucide-react";
import { TreeRing } from "./TreeRing";
import { AnnuliveLogo } from "../../components/AnnuliveLogo";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <TreeRing size="w-96 h-96" className="absolute -top-48 -right-48" />
        <TreeRing size="w-64 h-64" className="absolute top-1/2 -left-32" />
        <TreeRing size="w-48 h-48" className="absolute right-1/4 bottom-0" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <AnnuliveLogo width={96} height={96} showText={true} />
          </div>

          <h2 className="mb-6 text-5xl leading-tight font-extrabold text-amber-900 sm:text-6xl lg:text-7xl dark:text-amber-100">
            Branch out your skills,
            <br />
            <span className="bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent dark:from-amber-300 dark:to-orange-300">
              layer by layer
            </span>
          </h2>

          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-amber-800/80 sm:text-2xl dark:text-amber-200/80">
            AI-powered learning roadmaps that grow with you. Create, share, and
            explore personalized skill trees in our thriving community of
            learners.
          </p>

          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/roadmaps">
              <Button size="lg">
                Start Growing
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline">
                Explore Roadmaps
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
