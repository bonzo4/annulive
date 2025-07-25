export function TreeRing({
  size = "w-32 h-32",
  className = "",
}: {
  size?: string;
  className?: string;
}) {
  return (
    <div className={`${size} ${className} relative`}>
      <div className="absolute inset-0 animate-pulse rounded-full border-4 border-amber-800/30"></div>
      <div className="absolute inset-2 rounded-full border-3 border-amber-700/40"></div>
      <div className="absolute inset-4 rounded-full border-2 border-amber-600/50"></div>
      <div className="absolute inset-6 rounded-full border-2 border-amber-500/60"></div>
      <div className="absolute inset-8 rounded-full border border-amber-400/70"></div>
      <div className="absolute inset-10 rounded-full bg-gradient-to-br from-amber-300/20 to-amber-600/20"></div>
    </div>
  );
}
