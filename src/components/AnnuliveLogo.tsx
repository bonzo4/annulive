interface AnnuliveLogoProps {
  width?: number;
  height?: number;
  className?: string;
  showText?: boolean;
}

export function AnnuliveLogo({
  width = 120,
  height = 120,
  className = "",
  showText = true,
}: AnnuliveLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        <circle
          cx="60"
          cy="60"
          r="55"
          stroke="url(#gradient1)"
          strokeWidth="3"
          fill="none"
          className="animate-pulse"
          style={{ animationDuration: "3s" }}
        />

        <circle
          cx="60"
          cy="60"
          r="45"
          stroke="url(#gradient2)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.8"
        />

        <circle
          cx="60"
          cy="60"
          r="35"
          stroke="url(#gradient3)"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />

        <circle
          cx="60"
          cy="60"
          r="25"
          stroke="url(#gradient4)"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />

        <circle
          cx="60"
          cy="60"
          r="15"
          fill="url(#coreGradient)"
          opacity="0.8"
        />

        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>

          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
        </defs>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <h1 className="text-2xl leading-tight font-bold text-amber-900 dark:text-amber-100">
            Annulive
          </h1>
          <div className="h-0.5 w-full rounded-full bg-gradient-to-r from-amber-600 to-orange-600"></div>
        </div>
      )}
    </div>
  );
}

export function AnnuliveIcon({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <AnnuliveLogo
      width={size}
      height={size}
      className={className}
      showText={false}
    />
  );
}
