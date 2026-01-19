import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skills } from "@/lib/data";
import { Code2, Wrench, Layers } from "lucide-react";

export function SkillsSection() {
  return (
    <Card id="skills" className="rounded-3xl min-h-[800px]">
      <CardHeader className="p-10 pb-4">
        <CardTitle className="text-2xl font-bold text-black">Skills</CardTitle>
        <p className="text-sm text-black">
          My skills, which I constantly keep improving.
        </p>
      </CardHeader>
      <CardContent className="p-10 pt-5 space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-black">
            Programming Languages
          </h3>
          <div className="w-full h-px bg-gray-300 my-3" />
          <div className="flex flex-wrap gap-2">
            {skills.languages.map((skill) => (
              <Badge
                key={skill.name}
                variant="secondary"
                className="px-4 py-2 text-sm bg-primary/10 text-primary hover:bg-primary/20"
              >
                <span className="mr-2">{skill.icon}</span>
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-black">Frameworks</h3>
          <div className="w-full h-px bg-gray-300 my-3" />
          <div className="flex flex-wrap gap-2">
            {skills.frameworks.map((skill) => (
              <Badge
                key={skill.name}
                variant="secondary"
                className="px-4 py-2 text-sm bg-primary/10 text-primary hover:bg-primary/20"
              >
                <span className="mr-2">{skill.icon}</span>
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-black">Other Tools</h3>
          <div className="w-full h-px bg-gray-300 my-3" />
          <div className="flex flex-wrap gap-2">
            {skills.tools.map((skill) => (
              <Badge
                key={skill.name}
                variant="secondary"
                className="px-4 py-2 text-sm bg-primary/10 text-primary hover:bg-primary/20"
              >
                <span className="mr-2">{skill.icon}</span>
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
