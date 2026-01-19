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

export function HeroSection() {
  const contactItems = [
    { icon: Mail, label: "Email", value: personalInfo.contact.email },
    { icon: Phone, label: "Phone", value: personalInfo.contact.phone },
    { icon: Github, label: "Github", value: personalInfo.contact.github },
    { icon: Linkedin, label: "Linkedin", value: personalInfo.contact.linkedin },
    { icon: Twitter, label: "Twitter", value: personalInfo.contact.twitter },
  ];

  const socialLinks = [
    { icon: Facebook, href: personalInfo.social.facebook },
    { icon: Instagram, href: personalInfo.social.instagram },
    { icon: Twitter, href: personalInfo.social.twitter },
  ];

  return (
    <Card className="overflow-hidden rounded-3xl min-h-[800px] flex flex-col justify-between">
      <CardContent className="p-10 flex flex-col justify-between h-full">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-black">
              {personalInfo.name}
            </h1>
            <p className="text-sm text-black max-w-md">{personalInfo.bio}</p>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <Badge className="px-5 bg-primary/10 text-primary hover:bg-primary/20">
              {personalInfo.title}
            </Badge>
            <Badge className="px-5 bg-primary/10 text-primary hover:bg-primary/20">
              {personalInfo.subtitle}
            </Badge>
          </div>

          <div className="w-full h-px bg-gray-300 my-4" />

          <div className="w-full space-y-6">
            {contactItems.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white shadow-sm">
                  <item.icon className="h-5 w-5 text-black" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm text-black">{item.label}</p>
                  <p className="font-semibold text-black">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-center pt-4">
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
      </CardContent>
    </Card>
  );
}
