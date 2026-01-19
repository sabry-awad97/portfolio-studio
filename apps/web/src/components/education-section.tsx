import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { education } from "@/lib/data";
import { motion } from "motion/react";

const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
};

export function EducationSection() {
  return (
    <Card className="rounded-3xl min-h-[800px] overflow-hidden">
      <CardHeader className="p-10 pb-4">
        <CardTitle className="text-2xl font-bold text-black">
          Education
        </CardTitle>
      </CardHeader>
      <CardContent className="p-10 pt-3 overflow-y-auto max-h-[700px]">
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
              <motion.div
                key={item.id}
                className="flex mb-2.5"
                variants={itemVariants}
              >
                {/* Desktop view - alternating layout */}
                {isEven ? (
                  <>
                    {/* Empty space */}
                    <div className="hidden md:block flex-1 p-6" />

                    {/* Timeline with dot */}
                    <div className="relative flex items-center mr-10 ml-10">
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
                      <p
                        className="text-sm font-medium mb-2"
                        style={{ color: "#002ad2" }}
                      >
                        {item.date}
                      </p>
                      <h3 className="text-xl font-bold text-black mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-black">{item.description}</p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Content card */}
                    <div
                      className="flex-1 p-6 rounded-lg relative before:content-[''] before:absolute before:right-[-15px] before:w-0 before:h-0 before:border-15 before:border-transparent before:border-l-[#edf2f6]"
                      style={{ backgroundColor: "#edf2f6" }}
                    >
                      <p
                        className="text-sm font-medium mb-2"
                        style={{ color: "#2c5282" }}
                      >
                        {item.date}
                      </p>
                      <h3 className="text-xl font-bold text-black mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-black">{item.description}</p>
                    </div>

                    {/* Timeline with dot */}
                    <div className="relative flex items-center mr-10 ml-10">
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
                    <div className="hidden md:block flex-1 p-6" />
                  </>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </CardContent>
    </Card>
  );
}
