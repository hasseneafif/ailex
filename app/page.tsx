import { Metadata } from "next";
import dynamic from "next/dynamic";
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";

// Dynamic imports for below-the-fold sections
const Features = dynamic(() => import("@/components/Features"));
const Certifs = dynamic(() => import("@/components/Certifs"));
const AboutSectionOne = dynamic(() => import("@/components/About/AboutSectionOne"));
const Skills = dynamic(() => import("@/components/Skills"));
const Blog = dynamic(() => import("@/components/Blog"), { ssr: false }); // Blog often heavy, skip SSR
const ContactLight = dynamic(() => import("@/components/ContactLight"));

export const metadata: Metadata = {
  title: "Hass - Home",
  description: "This is Home for Hassene Afif's website.",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      {/* Above-the-fold content */}
      <Hero />

      {/* Below-the-fold content */}
      <Features />
      <Certifs />
      <AboutSectionOne />
      <Skills />
      <Blog />
      <ContactLight />
    </>
  );
}
