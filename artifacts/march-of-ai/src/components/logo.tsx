type LogoSize = "nav" | "hero"

export function Logo({ size = "nav" }: { size?: LogoSize }) {
  return (
    <span
      className={
        size === "hero"
          ? "text-4xl font-display font-bold tracking-tight"
          : "font-display font-bold text-lg tracking-tight"
      }
    >
      WeDo <span className="text-primary font-light">| AI</span>
    </span>
  )
}
