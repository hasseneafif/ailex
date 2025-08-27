"use client";
import React, { useRef } from "react";
import Image from "next/image";

interface HeroFreshDesktopProps {
  titleRef: React.RefObject<HTMLHeadingElement>;
  dropdownRef: React.RefObject<HTMLDivElement>;
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeroFreshDesktop: React.FC<HeroFreshDesktopProps> = ({ 
  titleRef, dropdownRef, showDropdown, setShowDropdown 
}) => {
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative z-10 overflow-hidden 
        h-[900px] flex items-start justify-center bg-black transition-all duration-300
        pt-[150px]"
    >
      {/* Image centered */}
      <div ref={imageWrapperRef} className="relative flex flex-col items-center">
        {/* Desktop image */}
      <Image
  src="/images/hero/new/ndesktop.png"
  alt="Hero desktop"
  width={600}
  height={800}
  className="hidden md:block w-[800px] h-auto object-contain"
  priority
  fetchPriority="high"
  quality={100}     // full quality
  unoptimized       // serve original without compression
  draggable={false}
/>


        {/* Mobile image */}
       <Image
  src="/images/hero/new/nmobile.png"
  alt="Hero mobile"
  width={600}
  height={800}
  className="block md:hidden w-[70vh] h-auto object-contain"
  priority   // ✅ loads ASAP
  fetchPriority="high" // ✅ extra hint for browser
    quality={100}     // full quality
  unoptimized       // serve original without compression
  draggable={false}
/>

        {/* Rotated text block under image aligned to right */}
        <div className="absolute bottom-[-13rem] right-[-90px] md:bottom-[-17rem] md:right-[-120px] flex flex-col items-baseline rotate-90">
          <h1
            ref={titleRef}
            className="font-xoireqe text-[1.5rem] md:text-[2rem] drop-shadow-lg text-white text-center"
          >
            HASSENE AFIF
          </h1>

          <span className="font-phitagate neon-green-mobile text-2xl lg:text-3xl">
            Software Engineer
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroFreshDesktop;
