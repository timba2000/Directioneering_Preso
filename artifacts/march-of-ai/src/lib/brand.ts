import { useTheme } from "@/components/theme-provider"

export type BrandBundle = {
  siteName: string
  presenter: { name: string; role: string }
  contactCtaLabel: string
  contactHref: string
  contactDisplayUrl: string
  footer: string
}

export const LIGHT_BRAND: BrandBundle = {
  siteName: "Australian Retirement Trust",
  presenter: { name: "Lenka Bednarikova", role: "GM Data and AI" },
  contactCtaLabel: "Contact Lenka",
  contactHref: "https://www.australianretirementtrust.com.au",
  contactDisplayUrl: "australianretirementtrust.com.au",
  footer: "© 2026 Australian Retirement Trust",
}

export const DARK_BRAND: BrandBundle = {
  siteName: "WeDo AI",
  presenter: { name: "Tim Barnes", role: "Head of AI" },
  contactCtaLabel: "Contact Tim Barnes",
  contactHref: "https://wedoai.com.au",
  contactDisplayUrl: "wedoai.com.au",
  footer: "© 2026 WeDo AI",
}

export function useBrand(): BrandBundle {
  const { theme } = useTheme()
  return theme === "light" ? LIGHT_BRAND : DARK_BRAND
}
