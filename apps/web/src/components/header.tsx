import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Freelance", href: "#freelance" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-2">
          <div className="h-12 p-2">
            <div className="h-full aspect-square bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              PP
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 ml-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800 rounded-md"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white font-semibold"
            asChild
          >
            <a href="#">View Resume</a>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    {item.label}
                  </a>
                ))}
                <Button className="mt-4 bg-primary hover:bg-primary/90" asChild>
                  <a href="#">View Resume</a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
