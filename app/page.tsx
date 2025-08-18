import AboutSectionOne from "@/components/About/AboutSectionOne";
import Blog from "@/components/Blog";
import ScrollUp from "@/components/Common/ScrollUp";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Certifs from "@/components/Certifs";
import Skills from "@/components/Skills";

import { Metadata } from "next";
import ContactLight from "@/components/ContactLight";

export const metadata: Metadata = {
  title: "Hass - Home",
  description: "This is Home for Hassene Afif's website.",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Certifs />
      <AboutSectionOne />
      <Skills />
      <Blog />
      <ContactLight />
    </>
  );
}
