import { Button } from "@/components/ui/button";
import { personalInfo } from "@/lib/data";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: personalInfo.social.facebook },
    { icon: Instagram, href: personalInfo.social.instagram },
    { icon: Twitter, href: personalInfo.social.twitter },
  ];

  return (
    <footer className="bg-white">
      <div className="py-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:text-primary hover:border hover:border-primary"
                asChild
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <social.icon className="h-6 w-6" />
                </a>
              </Button>
            ))}
          </div>
          <p className="text-xl font-bold text-gray-600">{personalInfo.name}</p>
        </div>
      </div>
    </footer>
  );
}
