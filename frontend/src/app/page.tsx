// page.tsx
import dynamic from 'next/dynamic';
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

// Dynamically import HeroSection with no SSR
const HeroSection = dynamic(
  () => import("@/components/sections/HeroSection"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
