import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skills } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  cardVariants,
  paddingVariants,
  typographyVariants,
} from "@/lib/responsive-classes";

export function SkillsSection() {
  return (
    <Card
      id="skills"
      className={cn(
        cardVariants({ size: "md" }),
        "rounded-3xl w-full h-full flex flex-col",
      )}
      aria-labelledby="skills-title"
    >
      <CardHeader className={cn(paddingVariants({ size: "lg" }))}>
        <CardTitle
          id="skills-title"
          className={cn(typographyVariants({ variant: "h2" }), "text-black")}
        >
          Skills
        </CardTitle>
        <p
          className={cn(
            typographyVariants({ variant: "small" }),
            "text-gray-700",
          )}
        >
          My skills, which I constantly keep improving.
        </p>
      </CardHeader>
      <CardContent
        className={cn(paddingVariants({ size: "lg" }), "pt-0 space-y-4 flex-1")}
      >
        <section aria-labelledby="languages-heading">
          <h3
            id="languages-heading"
            className={cn(typographyVariants({ variant: "h4" }), "text-black")}
          >
            Programming Languages
          </h3>
          <div
            className="w-full h-px bg-gray-300 my-3"
            role="separator"
            aria-hidden="true"
          />
          <div className="flex flex-wrap gap-2" role="list">
            {skills.languages.map((skill) => (
              <Badge
                key={skill.name}
                variant="secondary"
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-primary/10 text-primary hover:bg-primary/20"
                role="listitem"
              >
                <span className="mr-2" aria-hidden="true">
                  {skill.icon}
                </span>
                {skill.name}
              </Badge>
            ))}
          </div>
        </section>

        <section aria-labelledby="frameworks-heading">
          <h3
            id="frameworks-heading"
            className={cn(typographyVariants({ variant: "h4" }), "text-black")}
          >
            Frameworks
          </h3>
          <div
            className="w-full h-px bg-gray-300 my-3"
            role="separator"
            aria-hidden="true"
          />
          <div className="flex flex-wrap gap-2" role="list">
            {skills.frameworks.map((skill) => (
              <Badge
                key={skill.name}
                variant="secondary"
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-primary/10 text-primary hover:bg-primary/20"
                role="listitem"
              >
                <span className="mr-2" aria-hidden="true">
                  {skill.icon}
                </span>
                {skill.name}
              </Badge>
            ))}
          </div>
        </section>

        <section aria-labelledby="tools-heading">
          <h3
            id="tools-heading"
            className={cn(typographyVariants({ variant: "h4" }), "text-black")}
          >
            Other Tools
          </h3>
          <div
            className="w-full h-px bg-gray-300 my-3"
            role="separator"
            aria-hidden="true"
          />
          <div className="flex flex-wrap gap-2" role="list">
            {skills.tools.map((skill) => (
              <Badge
                key={skill.name}
                variant="secondary"
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-primary/10 text-primary hover:bg-primary/20"
                role="listitem"
              >
                <span className="mr-2" aria-hidden="true">
                  {skill.icon}
                </span>
                {skill.name}
              </Badge>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
