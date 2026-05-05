import React, { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "signal-problem", label: "00", title: "The Problem" },
  { id: "section-01", label: "01", title: "Calibration" },
  { id: "section-02", label: "02", title: "Deployability" },
  { id: "section-03", label: "03", title: "Prerequisite" },
  { id: "section-04", label: "04", title: "Three Lenses" },
  { id: "section-05", label: "05", title: "Five Questions" },
  { id: "section-06", label: "06", title: "Heading" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple intersection observer equivalent for active section
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100; // offset for navbar

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border py-3 shadow-sm"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-lg tracking-tight cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            WeDo <span className="text-primary font-light">| AI</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex flex-col items-center group",
                activeSection === item.id
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <span className="text-[10px] uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
                {item.label}
              </span>
              <span className={cn(
                "h-1 w-1 rounded-full mt-1 transition-all",
                activeSection === item.id ? "bg-primary scale-100" : "bg-transparent scale-0"
              )} />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
