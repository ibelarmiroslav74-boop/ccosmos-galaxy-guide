interface Props {
  label?: string;
  size?: number;
  className?: string;
}

export function Loader({ label, size = 44, className = "" }: Props) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div
        className="relative"
        style={{ width: size, height: size }}
        role="status"
        aria-label={label ?? "Loading"}
      >
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-white/80 animate-spin"
          style={{ animationDuration: "1s" }}
        />
        <div
          className="absolute inset-2 rounded-full border border-white/5 animate-spin"
          style={{ animationDuration: "3s", animationDirection: "reverse" }}
        />
      </div>
      {label && (
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
}

export function LoaderBox({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`grid place-items-center w-full h-full min-h-[240px] ${className}`}>
      <Loader label={label} />
    </div>
  );
}
