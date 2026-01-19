import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { touchTargetVariants } from "@/lib/responsive-classes";

const navItems = [
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Freelance", href: "#freelance" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm supports-backdrop-filter:bg-white/80 shadow-sm">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2">
            <div className="h-12 p-2">
              <div className="h-full aspect-square bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                PP
              </div>
            </div>
          </div>

          <nav
            className="hidden md:flex items-center gap-1 ml-10"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  touchTargetVariants({ size: "sm" }),
                  "px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100 hover:text-gray-900 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 ml-auto">
            <Button
              size="sm"
              className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-white font-semibold min-h-[44px]"
              asChild
            >
              <a href="#" aria-label="View resume document">
                View Resume
              </a>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    touchTargetVariants({ size: "md", shape: "circle" }),
                  )}
                  aria-label="Toggle navigation menu"
                  aria-expanded={isOpen}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" aria-label="Mobile navigation">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        touchTargetVariants({ size: "md" }),
                        "text-lg font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md",
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button
                    className="mt-4 bg-primary hover:bg-primary/90 min-h-[48px]"
                    asChild
                  >
                    <a href="#" aria-label="View resume document">
                      View Resume
                    </a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
