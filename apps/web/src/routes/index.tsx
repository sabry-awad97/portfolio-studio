import { createFileRoute } from "@tanstack/react-router";
import { CTASection } from "@/components/cta-section";
import { EducationSection } from "@/components/education-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { motion } from "motion/react";

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
      <main className="flex-1">
        {/* First Row: Profile Card + Education */}
        <motion.div
          className="max-w-7xl mx-auto px-4 py-5"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 items-start">
            <motion.div variants={fadeInUp}>
              <HeroSection />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <EducationSection />
            </motion.div>
          </div>
        </motion.div>

        {/* Second Row: Projects + Skills */}
        <motion.div
          className="max-w-7xl mx-auto px-4 py-5"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
            <motion.div variants={fadeInUp}>
              <ProjectsSection />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <SkillsSection />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <CTASection />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
