import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

interface NavSection {
  label: string;
  title: string;
  pageIndex: number;
}

interface NavbarProps {
  currentPage: number;
  totalPages: number;
  navSections: NavSection[];
  onNavigate: (index: number) => void;
}

export function Navbar({ currentPage, navSections, onNavigate }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border py-3 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <button
          className="font-display font-bold text-lg tracking-tight"
          onClick={() => onNavigate(0)}
          data-testid="nav-logo"
        >
          WeDo <span className="text-primary font-light">| AI</span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {navSections.map((item) => {
            const isActive = currentPage === item.pageIndex ||
              (item.pageIndex === 3 && currentPage === 4);
            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.pageIndex)}
                data-testid={`nav-section-${item.label}`}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex flex-col items-center group",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <span className="text-[10px] uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
                <span
                  className={cn(
                    "h-1 w-1 rounded-full mt-1 transition-all",
                    isActive ? "bg-primary scale-100" : "bg-transparent scale-0"
                  )}
                />
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
