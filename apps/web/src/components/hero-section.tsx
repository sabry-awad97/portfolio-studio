import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { personalInfo } from "@/lib/data";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  cardVariants,
  paddingVariants,
  typographyVariants,
  touchTargetVariants,
} from "@/lib/responsive-classes";

export function HeroSection() {
  const contactItems = [
    { icon: Mail, label: "Email", value: personalInfo.contact.email },
    { icon: Phone, label: "Phone", value: personalInfo.contact.phone },
    { icon: Github, label: "Github", value: personalInfo.contact.github },
    { icon: Linkedin, label: "Linkedin", value: personalInfo.contact.linkedin },
    { icon: Twitter, label: "Twitter", value: personalInfo.contact.twitter },
  ];

  const socialLinks = [
    { icon: Facebook, href: personalInfo.social.facebook, name: "Facebook" },
    { icon: Instagram, href: personalInfo.social.instagram, name: "Instagram" },
    { icon: Twitter, href: personalInfo.social.twitter, name: "Twitter" },
  ];

  return (
    <Card
      className={cn(
        cardVariants({ size: "md" }),
        "overflow-hidden rounded-3xl w-full h-full flex flex-col",
      )}
    >
      <CardContent
        className={cn(
          paddingVariants({ size: "lg" }),
          "flex flex-col justify-between flex-1",
        )}
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className="size-24 sm:size-32 rounded-full overflow-hidden border-4 border-gray-100">
              <img
                src={personalInfo.avatar}
                alt={`${personalInfo.name}'s profile picture`}
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h1
              className={cn(
                typographyVariants({ variant: "h1" }),
                "text-black",
              )}
            >
              {personalInfo.name}
            </h1>
            <p
              className={cn(
                typographyVariants({ variant: "small" }),
                "text-gray-800 max-w-md",
              )}
            >
              {personalInfo.bio}
            </p>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <Badge className="px-4 sm:px-5 bg-primary/10 text-primary hover:bg-primary/20">
              {personalInfo.title}
            </Badge>
            <Badge className="px-4 sm:px-5 bg-primary/10 text-primary hover:bg-primary/20">
              {personalInfo.subtitle}
            </Badge>
          </div>

          <div
            className="w-full h-px bg-gray-300 my-4"
            role="separator"
            aria-hidden="true"
          />

          <div className="w-full space-y-6">
            {contactItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white shadow-sm shrink-0"
                  aria-hidden="true"
                >
                  <item.icon className="h-5 w-5 text-black" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p
                    className={cn(
                      typographyVariants({ variant: "small" }),
                      "text-gray-800",
                    )}
                  >
                    {item.label}
                  </p>
                  <p
                    className={cn(
                      typographyVariants({
                        variant: "body",
                        weight: "semibold",
                      }),
                      "text-gray-800 truncate",
                    )}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex gap-2 justify-center pt-4"
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
      </CardContent>
    </Card>
  );
}
