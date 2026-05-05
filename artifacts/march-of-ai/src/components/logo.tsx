import { useTheme } from "@/components/theme-provider"

type LogoSize = "nav" | "hero"

export function Logo({ size = "nav" }: { size?: LogoSize }) {
  const { theme } = useTheme()

  if (theme === "light") {
    return (
      <img
        src={`${import.meta.env.BASE_URL}art-logo-mark.svg`}
        alt="Australian Retirement Trust"
        className={size === "hero" ? "h-16 md:h-20 w-auto" : "h-8 w-auto"}
      />
    )
  }

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
