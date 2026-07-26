export function WebglFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(60% 50% at 50% 20%, rgba(76,141,255,0.16) 0%, rgba(5,5,5,0) 70%)",
      }}
    >
      <svg className="h-full w-full opacity-[0.12]" aria-hidden>
        <defs>
          <pattern
            id="grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="var(--accent-strong)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
