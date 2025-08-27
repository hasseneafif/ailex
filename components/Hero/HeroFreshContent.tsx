"use client";
import React, { useRef } from "react";
import Image from "next/image";

interface HeroFreshDesktopProps {

}

const HeroFreshDesktop: React.FC<HeroFreshDesktopProps> = ({ 
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
  src="/images/hero/new/ndesktop-min.webp"
  alt="Hero desktop"
  width={600}
  height={800}
  className="hidden md:block w-[800px] h-auto object-contain"
  priority
  fetchPriority="high"
  draggable={false}
  unoptimized
  quality={100}
/>


        {/* Mobile image */}
       <Image
  src="/images/hero/new/nmobile-min.webp"
  alt="Hero mobile"
  width={600}
  height={800}
  className="block md:hidden w-[70vh] h-auto object-contain"
  priority   
  fetchPriority="high" 
    quality={100}     
    unoptimized
  draggable={false}
/>

        <div className="absolute bottom-[-13rem] right-[-90px] md:bottom-[-17rem] md:right-[-120px] flex flex-col items-baseline rotate-90">
          <h1
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
