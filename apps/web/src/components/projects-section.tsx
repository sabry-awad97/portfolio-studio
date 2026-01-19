import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/lib/data";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  cardVariants,
  paddingVariants,
  typographyVariants,
} from "@/lib/responsive-classes";

const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
};

export function ProjectsSection() {
  return (
    <Card
      id="projects"
      className={cn(cardVariants({ size: "md" }), "rounded-3xl")}
      aria-labelledby="projects-title"
    >
      <CardHeader className={cn(paddingVariants({ size: "lg" }), "pb-4")}>
        <CardTitle
          id="projects-title"
          className={cn(typographyVariants({ variant: "h2" }), "text-black")}
        >
          Projects
        </CardTitle>
      </CardHeader>
      <CardContent
        className={cn(
          paddingVariants({ size: "lg" }),
          "pt-3 overflow-y-auto max-h-[500px] md:max-h-[850px]",
        )}
      >
        <motion.div
          className="relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={project.id}
                className="mb-2.5"
                variants={itemVariants}
                aria-label={`${project.title} - ${project.date}`}
              >
                {/* Mobile view - simplified single column */}
                <div className="flex md:hidden gap-4">
                  <div className="relative flex flex-col items-center w-10 shrink-0">
                    <span
                      className="absolute left-1/2 h-[calc(100%+10px)] top-0 -translate-x-1/2"
                      style={{ borderLeft: "1px solid #cbd5e0" }}
                      aria-hidden="true"
                    />
                    <div className="relative p-2.5 z-10" aria-hidden="true">
                      <div
                        className="absolute top-0 left-0 bottom-0 right-0 w-full h-full rounded-full"
                        style={{ backgroundColor: "#002ad2" }}
                      />
                    </div>
                  </div>
                  <div
                    className="flex-1 p-4 rounded-lg"
                    style={{ backgroundColor: "#edf2f6" }}
                  >
                    <time
                      className="text-xs sm:text-sm font-medium mb-2 block"
                      style={{ color: "#002ad2" }}
                      dateTime={project.date}
                    >
                      {project.date}
                    </time>
                    <h3
                      className={cn(
                        typographyVariants({ variant: "h4" }),
                        "text-black mb-2",
                      )}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={cn(
                        typographyVariants({ variant: "small" }),
                        "text-black mb-3",
                      )}
                    >
                      {project.description}
                    </p>
                    <div
                      className="flex flex-wrap gap-2"
                      role="list"
                      aria-label="Technologies used"
                    >
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20 text-xs"
                          role="listitem"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Desktop view - alternating layout */}
                <div className="hidden md:flex">
                  {isEven ? (
                    <>
                      {/* Empty space */}
                      <div className="flex-1 p-6" aria-hidden="true" />

                      {/* Timeline with dot */}
                      <div
                        className="relative flex items-center mr-10 ml-10"
                        aria-hidden="true"
                      >
                        <span
                          className="absolute left-1/2 h-[calc(100%+10px)] top-0"
                          style={{ borderLeft: "1px solid #cbd5e0" }}
                        />
                        <div className="relative p-2.5">
                          <div
                            className="absolute top-0 left-0 bottom-0 right-0 w-full h-full rounded-full"
                            style={{ backgroundColor: "#002ad2" }}
                          />
                        </div>
                      </div>

                      {/* Content card */}
                      <div
                        className="flex-1 p-6 rounded-lg relative before:content-[''] before:absolute before:left-[-15px] before:w-0 before:h-0 before:border-15 before:border-transparent before:border-r-[#edf2f6]"
                        style={{ backgroundColor: "#edf2f6" }}
                      >
                        <time
                          className="text-sm font-medium mb-2 block"
                          style={{ color: "#002ad2" }}
                          dateTime={project.date}
                        >
                          {project.date}
                        </time>
                        <h3
                          className={cn(
                            typographyVariants({ variant: "h4" }),
                            "text-black mb-2",
                          )}
                        >
                          {project.title}
                        </h3>
                        <p
                          className={cn(
                            typographyVariants({ variant: "small" }),
                            "text-black mb-3",
                          )}
                        >
                          {project.description}
                        </p>
                        <div
                          className="flex flex-wrap gap-2"
                          role="list"
                          aria-label="Technologies used"
                        >
                          {project.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-primary/10 text-primary hover:bg-primary/20"
                              role="listitem"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Content card */}
                      <div
                        className="flex-1 p-6 rounded-lg relative before:content-[''] before:absolute before:right-[-15px] before:w-0 before:h-0 before:border-15 before:border-transparent before:border-l-[#edf2f6]"
                        style={{ backgroundColor: "#edf2f6" }}
                      >
                        <time
                          className="text-sm font-medium mb-2 block"
                          style={{ color: "#2c5282" }}
                          dateTime={project.date}
                        >
                          {project.date}
                        </time>
                        <h3
                          className={cn(
                            typographyVariants({ variant: "h4" }),
                            "text-black mb-2",
                          )}
                        >
                          {project.title}
                        </h3>
                        <p
                          className={cn(
                            typographyVariants({ variant: "small" }),
                            "text-black mb-3",
                          )}
                        >
                          {project.description}
                        </p>
                        <div
                          className="flex flex-wrap gap-2"
                          role="list"
                          aria-label="Technologies used"
                        >
                          {project.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-primary/10 text-primary hover:bg-primary/20"
                              role="listitem"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Timeline with dot */}
                      <div
                        className="relative flex items-center mr-10 ml-10"
                        aria-hidden="true"
                      >
                        <span
                          className="absolute left-1/2 h-[calc(100%+10px)] top-0"
                          style={{ borderLeft: "1px solid #cbd5e0" }}
                        />
                        <div className="relative p-2.5">
                          <div
                            className="absolute top-0 left-0 bottom-0 right-0 w-full h-full rounded-full"
                            style={{ backgroundColor: "#002ad2" }}
                          />
                        </div>
                      </div>

                      {/* Empty space */}
                      <div className="flex-1 p-6" aria-hidden="true" />
                    </>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </CardContent>
    </Card>
  );
}
