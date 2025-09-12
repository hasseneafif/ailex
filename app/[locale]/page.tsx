import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const Certifs = dynamic(() => import("@/components/Certifs"), { ssr: false });
const AboutSectionOne = dynamic(() => import("@/components/About/AboutSectionOne"), { ssr: false });
const Skills = dynamic(() => import("@/components/Skills"), { ssr: false });


export const metadata: Metadata = {
  title: "Hassene Afif",
  description: "Hassene Afif's personal space",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Certifs />
      <AboutSectionOne />
      <Skills />

    </>
  );
}
