import { createFileRoute } from "@tanstack/react-router";
import { CTASection } from "@/components/cta-section";
import { EducationSection } from "@/components/education-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { motion } from "motion/react";
import { sectionVariants } from "@/lib/responsive-classes";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

function HomeComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#dbd6e7]">
      <Header />
      <main id="main-content" className="flex-1" role="main">
        {/* Profile and Education Section */}
        <motion.section
          className={cn(
            sectionVariants({ spacing: "md", container: "constrained" }),
          )}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          aria-labelledby="profile-heading"
        >
          <h2 id="profile-heading" className="sr-only">
            Profile and Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[400px_1fr] gap-6 md:gap-8 items-stretch">
            <motion.div variants={fadeInUp} className="flex">
              <HeroSection />
            </motion.div>
            <motion.div variants={fadeInUp} className="flex">
              <EducationSection />
            </motion.div>
          </div>
        </motion.section>

        {/* Projects and Skills Section */}
        <motion.section
          className={cn(
            sectionVariants({ spacing: "md", container: "constrained" }),
          )}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          aria-labelledby="work-heading"
        >
          <h2 id="work-heading" className="sr-only">
            Projects and Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_400px] gap-6 md:gap-8 items-stretch">
            <motion.div variants={fadeInUp} className="flex">
              <ProjectsSection />
            </motion.div>
            <motion.div variants={fadeInUp} className="flex">
              <SkillsSection />
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          aria-labelledby="freelance-heading"
        >
          <h2 id="freelance-heading" className="sr-only">
            Freelance Services
          </h2>
          <CTASection />
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
