import AboutSectionOne from "@/components/About/AboutSectionOne";
import Blog from "@/components/Blog";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vestr.ai",
  description: "This is Home for Vestr.ai",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <AboutSectionOne />
      {/* <Video /> */}
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
      <Blog />
      <Contact />
    </>
  );
}
