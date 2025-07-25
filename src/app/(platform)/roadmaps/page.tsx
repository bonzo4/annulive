export default function Roadmaps() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-amber-900 dark:text-amber-100">
        Your Roadmaps
      </h1>
      <div className="space-y-6">
        <div className="rounded-lg border border-amber-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-amber-800/50 dark:bg-amber-950/50">
          <h2 className="mb-2 text-xl font-semibold text-amber-900 dark:text-amber-100">
            Frontend Development
          </h2>
          <p className="mb-4 text-amber-800/70 dark:text-amber-200/70">
            Master modern frontend technologies and frameworks.
          </p>
          <div className="flex items-center justify-between">
            <div className="mr-4 h-2 flex-1 rounded-full bg-amber-200/50 dark:bg-amber-800/30">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600"
                style={{ width: "65%" }}
              ></div>
            </div>
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
              65%
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-amber-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-amber-800/50 dark:bg-amber-950/50">
          <h2 className="mb-2 text-xl font-semibold text-amber-900 dark:text-amber-100">
            Data Science
          </h2>
          <p className="mb-4 text-amber-800/70 dark:text-amber-200/70">
            Learn data analysis, machine learning, and visualization.
          </p>
          <div className="flex items-center justify-between">
            <div className="mr-4 h-2 flex-1 rounded-full bg-amber-200/50 dark:bg-amber-800/30">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600"
                style={{ width: "30%" }}
              ></div>
            </div>
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
              30%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
