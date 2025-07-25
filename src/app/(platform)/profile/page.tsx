export default function Profile() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-amber-900 dark:text-amber-100">
        Your Profile
      </h1>
      <div className="rounded-lg border border-amber-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-amber-800/50 dark:bg-amber-950/50">
        <div className="mb-6 flex items-center space-x-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-400 dark:from-amber-700 dark:to-orange-700">
            <span className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              JD
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              John Doe
            </h2>
            <p className="text-amber-800/70 dark:text-amber-200/70">
              Frontend Developer
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-amber-800 dark:text-amber-200">
              Email
            </label>
            <p className="text-amber-900 dark:text-amber-100">
              john.doe@example.com
            </p>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-amber-800 dark:text-amber-200">
              Bio
            </label>
            <p className="text-amber-900 dark:text-amber-100">
              Passionate about learning new technologies and building amazing
              user experiences.
            </p>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-amber-800 dark:text-amber-200">
              Skills
            </label>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-amber-200 px-3 py-1 text-sm text-amber-900 dark:bg-amber-800 dark:text-amber-100">
                React
              </span>
              <span className="rounded-full bg-orange-200 px-3 py-1 text-sm text-orange-900 dark:bg-orange-800 dark:text-orange-100">
                TypeScript
              </span>
              <span className="rounded-full bg-yellow-200 px-3 py-1 text-sm text-yellow-900 dark:bg-yellow-800 dark:text-yellow-100">
                Next.js
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
