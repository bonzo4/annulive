interface LoaderProps {
  text?: string;
}

export default function Loader({ text }: LoaderProps) {
  return (
    <div className="py-8 text-center">
      <div className="flex items-center justify-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-700 border-t-transparent dark:border-amber-300 dark:border-t-transparent"></div>
        <p className="text-amber-700 dark:text-amber-300">
          {text || "Loading..."}
        </p>
      </div>
    </div>
  );
}
