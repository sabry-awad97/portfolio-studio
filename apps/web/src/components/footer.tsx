import { Button } from "@/components/ui/button";
import { personalInfo } from "@/lib/data";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  touchTargetVariants,
  typographyVariants,
} from "@/lib/responsive-classes";

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: personalInfo.social.facebook, name: "Facebook" },
    { icon: Instagram, href: personalInfo.social.instagram, name: "Instagram" },
    { icon: Twitter, href: personalInfo.social.twitter, name: "Twitter" },
  ];

  return (
    <footer className="bg-white" role="contentinfo">
      <div className="py-6 md:py-8">
        <div className="flex flex-col items-center gap-4">
          <div
            className="flex gap-2"
            role="group"
            aria-label="Social media links"
          >
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className={cn(
                  touchTargetVariants({ size: "md", shape: "circle" }),
                  "hover:bg-primary/10 hover:text-primary hover:border hover:border-primary",
                )}
                asChild
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.name} profile`}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              </Button>
            ))}
          </div>
          <p
            className={cn(
              typographyVariants({ variant: "h4", weight: "bold" }),
              "text-gray-600",
            )}
          >
            {personalInfo.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
