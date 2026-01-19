import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { education } from "@/lib/data";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  cardVariants,
  paddingVariants,
  typographyVariants,
} from "@/lib/responsive-classes";

const itemVariants = {
  initial: { opacity: 0, transform: "translateX(-20px)" },
  animate: { opacity: 1, transform: "translateX(0)" },
};

export function EducationSection() {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? {} : itemVariants;

  return (
    <Card
      id="education"
      className={cn(
        cardVariants({ size: "md" }),
        "rounded-3xl w-full h-full flex flex-col",
      )}
      aria-labelledby="education-title"
    >
      <CardHeader className={cn(paddingVariants({ size: "lg" }), "pb-4")}>
        <CardTitle
          id="education-title"
          className={cn(typographyVariants({ variant: "h2" }), "text-black")}
        >
          Education
        </CardTitle>
      </CardHeader>
      <CardContent
        className={cn(
          paddingVariants({ size: "lg" }),
          "pt-3 overflow-y-auto max-h-[500px] md:max-h-[800px] relative flex-1",
        )}
        style={{ contentVisibility: "auto" }}
        tabIndex={0}
        role="region"
        aria-label="Scrollable education timeline"
      >
        <section aria-label="Education timeline">
          <motion.div
            className="relative"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.1 }}
          >
            {education.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.article
                  key={item.id}
                  className="mb-2.5"
                  variants={variants}
                  aria-label={`${item.title} - ${item.date}`}
                >
                  {/* Mobile view - simplified single column */}
                  <div className="flex lg:hidden gap-4">
                    <div className="relative flex flex-col items-center w-10 shrink-0 min-h-full">
                      <span
                        className={cn(
                          "absolute left-1/2 top-0 -translate-x-1/2 border-l border-gray-400",
                          index === education.length - 1
                            ? "h-full"
                            : "h-[calc(100%+10px)]",
                        )}
                        aria-hidden="true"
                      />
                      <div
                        className="relative p-2.5 z-10 mt-2"
                        aria-hidden="true"
                      >
                        <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full rounded-full bg-primary" />
                      </div>
                    </div>
                    <div className="flex-1 p-4 rounded-lg bg-gray-100">
                      <time
                        className="text-xs sm:text-sm font-medium mb-2 block text-primary"
                        dateTime={item.date}
                      >
                        {item.date}
                      </time>
                      <h3
                        className={cn(
                          typographyVariants({ variant: "h4" }),
                          "text-black mb-2",
                        )}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={cn(
                          typographyVariants({ variant: "small" }),
                          "text-gray-800",
                        )}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Desktop view - alternating layout */}
                  <div className="hidden lg:flex">
                    {isEven ? (
                      <>
                        {/* Empty space */}
                        <div className="flex-1 p-6" aria-hidden="true" />

                        {/* Timeline with dot */}
                        <div
                          className="relative flex items-center mx-6 md:mx-8 lg:mx-10"
                          aria-hidden="true"
                        >
                          <span
                            className={cn(
                              "absolute left-1/2 top-0 border-l border-gray-400",
                              index === education.length - 1
                                ? "h-full"
                                : "h-[calc(100%+10px)]",
                            )}
                          />
                          <div className="relative p-2.5">
                            <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full rounded-full bg-primary" />
                          </div>
                        </div>

                        {/* Content card */}
                        <div className="flex-1 p-6 rounded-lg relative bg-gray-100 before:content-[''] before:absolute before:left-[-14px] before:w-0 before:h-0 before:border-14 before:border-transparent before:border-r-gray-100">
                          <time
                            className="text-sm font-medium mb-2 block text-primary"
                            dateTime={item.date}
                          >
                            {item.date}
                          </time>
                          <h3
                            className={cn(
                              typographyVariants({ variant: "h4" }),
                              "text-black mb-2",
                            )}
                          >
                            {item.title}
                          </h3>
                          <p
                            className={cn(
                              typographyVariants({ variant: "small" }),
                              "text-gray-800",
                            )}
                          >
                            {item.description}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Content card */}
                        <div className="flex-1 p-6 rounded-lg relative bg-gray-100 before:content-[''] before:absolute before:right-[-14px] before:w-0 before:h-0 before:border-14 before:border-transparent before:border-l-gray-100">
                          <time
                            className="text-sm font-medium mb-2 block text-primary"
                            dateTime={item.date}
                          >
                            {item.date}
                          </time>
                          <h3
                            className={cn(
                              typographyVariants({ variant: "h4" }),
                              "text-black mb-2",
                            )}
                          >
                            {item.title}
                          </h3>
                          <p
                            className={cn(
                              typographyVariants({ variant: "small" }),
                              "text-gray-800",
                            )}
                          >
                            {item.description}
                          </p>
                        </div>

                        {/* Timeline with dot */}
                        <div
                          className="relative flex items-center mx-6 md:mx-8 lg:mx-10"
                          aria-hidden="true"
                        >
                          <span
                            className={cn(
                              "absolute left-1/2 top-0 border-l border-gray-400",
                              index === education.length - 1
                                ? "h-full"
                                : "h-[calc(100%+10px)]",
                            )}
                          />
                          <div className="relative p-2.5">
                            <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full rounded-full bg-primary" />
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
        </section>
      </CardContent>
    </Card>
  );
}
