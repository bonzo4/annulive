import { Brain, Users, Target } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="bg-white/50 py-20 backdrop-blur-sm dark:bg-black/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h3 className="mb-4 text-3xl font-bold text-amber-900 sm:text-4xl dark:text-amber-100">
            Grow Your Knowledge Tree
          </h3>
          <p className="mx-auto max-w-2xl text-lg text-amber-800/70 dark:text-amber-200/70">
            Every skill builds upon the last, creating strong foundations for
            lifelong learning
          </p>
        </div>

        <div className="flex flex-col justify-center gap-8 md:flex-row">
          <div className="group rounded-2xl border border-amber-200 bg-white/80 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:border-amber-800 dark:bg-amber-950/50">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 transition-transform group-hover:scale-110">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h4 className="mb-2 text-xl font-semibold text-amber-900 dark:text-amber-100">
              AI-Powered Paths
            </h4>
            <p className="text-amber-800/70 dark:text-amber-200/70">
              Smart algorithms create personalized learning journeys based on
              your goals and progress.
            </p>
          </div>

          <div className="group rounded-2xl border border-amber-200 bg-white/80 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:border-amber-800 dark:bg-amber-950/50">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 transition-transform group-hover:scale-110">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h4 className="mb-2 text-xl font-semibold text-amber-900 dark:text-amber-100">
              Social Learning
            </h4>
            <p className="text-amber-800/70 dark:text-amber-200/70">
              Connect with fellow learners, share progress, and discover new
              paths through community.
            </p>
          </div>

          <div className="group rounded-2xl border border-amber-200 bg-white/80 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:border-amber-800 dark:bg-amber-950/50">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 transition-transform group-hover:scale-110">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h4 className="mb-2 text-xl font-semibold text-amber-900 dark:text-amber-100">
              Goal Tracking
            </h4>
            <p className="text-amber-800/70 dark:text-amber-200/70">
              Set milestones, track progress, and celebrate each new ring of
              knowledge you add.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
