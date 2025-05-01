// app/page.js or app/page.jsx

'use client'; // Add this only if you're not using dynamic imports (optional in your case)

import dynamic from 'next/dynamic';

// Dynamically import all sections with SSR disabled
const HeroSection = dynamic(() => import("@/components/sections/HeroSection"), { ssr: false });
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), { ssr: false });
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"), { ssr: false });
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), { ssr: false });
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), { ssr: false });

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
