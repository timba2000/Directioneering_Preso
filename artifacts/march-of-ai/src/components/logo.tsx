type LogoSize = "nav" | "hero"

export function Logo({ size = "nav" }: { size?: LogoSize }) {
  return (
    <span
      className={
        size === "hero"
          ? "inline-flex items-center gap-2 text-4xl font-display font-bold tracking-tight"
          : "inline-flex items-center gap-2 font-display font-bold text-lg tracking-tight"
      }
    >
      <span
        className={
          size === "hero"
            ? "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_0_22px_hsla(259,94%,63%,0.35)]"
            : "inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_0_14px_hsla(259,94%,63%,0.35)]"
        }
        aria-hidden
      >
        <span className={size === "hero" ? "text-lg font-bold" : "text-xs font-bold"}>W</span>
      </span>
      WeDo <span className="gradient-text font-light">| AI</span>
    </span>
  )
}
