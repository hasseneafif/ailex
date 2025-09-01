import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

// Dynamic imports for below-the-fold sections
// const Features = dynamic(() => import("@/components/Features"));
const Certifs = dynamic(() => import("@/components/Certifs"));
const AboutSectionOne = dynamic(() => import("@/components/About/AboutSectionOne"));
const Skills = dynamic(() => import("@/components/Skills"));
const Blog = dynamic(() => import("@/components/Blog"), { ssr: false }); // Blog often heavy, skip SSR
const ContactLight = dynamic(() => import("@/components/ContactLight"));
const MidSection = dynamic(() => import("@/components/MidSection/MidSection"));


export const metadata: Metadata = {
  title: "Hassene Afif",
  description: "Hassene Afif's personal space",
};

export default function Home() {
  return (
    <>
      {/* Above-the-fold content */}
      <Hero />

      {/* Below-the-fold content */}
      {/* <Features /> */}
                  <Certifs />

      <AboutSectionOne />
      <Skills />

    </>
  );
}
