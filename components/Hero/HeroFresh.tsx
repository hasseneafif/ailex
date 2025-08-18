"use client";

import "../../styles/hero-fresh.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const lettersAndSymbols = "abcdefghijklmnopqrstuvwxyz!@#$%^&*-_+=;:<>,".split("");

const HeroFresh = () => {
  const titleRef = useRef<HTMLSpanElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Splitting animation
  useEffect(() => {
    if (!titleRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    import("splitting").then((SplittingModule) => {
      const Splitting = SplittingModule.default;
      Splitting({ target: titleRef.current!, by: "chars" });

      const animateChars = () => {
        const chars = titleRef.current!.querySelectorAll(".char");
        chars.forEach((char, position) => {
          const initialHTML = char.innerHTML;
          gsap.fromTo(
            char,
            { opacity: 0 },
            {
              duration: 0.03,
              innerHTML: () =>
                lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
              repeat: 1,
              repeatRefresh: true,
              opacity: 1,
              repeatDelay: 0.03,
              delay: (position + 1) * 0.18,
              onComplete: () => gsap.set(char, { innerHTML: initialHTML }),
            }
          );
        });
      };

      animateChars();
      ScrollTrigger.create({
        trigger: titleRef.current!,
        start: "top 80%",
        onEnterBack: animateChars,
      });
    });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden min-h-[90vh] md:min-h-[100vh] h-full pb-16 pt-[120px] md:pb-[180px] md:pt-[200px] xl:pb-[220px] xl:pt-[240px] 2xl:pb-[260px] 2xl:pt-[280px] flex flex-col items-center justify-center bg-black"
    >
      {/* Background images */}
      <div className="absolute inset-0 z-[-1] w-full h-full flex items-center justify-center lg:ml-20 lg:justify-start">
        <div className="flex flex-col">
          <div className="flex flex-row items-end justify-center" style={{ gap: 30 }}>
            <div className="relative hero-img-wrapper" style={{ width: "auto", height: "60vh", minWidth: 0 }}>
              <img
                src="/images/hero/hbg0.png"
                alt="Profile 1"
                width={320}
                height={600}
                className="object-contain hero-bg-img"
                style={{ objectFit: "contain", height: "100%", width: "auto", maxWidth: "100%" }}
              />
            </div>
            <div className="relative hero-img-wrapper" style={{ width: "auto", height: "60vh", minWidth: 0 }}>
              <img
                src="/images/hero/hbg2.png"
                alt="Profile 2"
                width={320}
                height={600}
                className="object-contain hero-bg-img"
                style={{ objectFit: "contain", height: "100%", width: "auto", maxWidth: "100%" }}
              />
            </div>
          </div>
          <span
            className="mt-6 hidden md:block"
            style={{ color: "#e11d48", fontSize: "0.95rem", letterSpacing: "0.05em" }}
          >
            花は桜木、人は武士されど桜は 時の花、人の心は永遠に咲く。
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="container flex flex-col items-center justify-center h-full relative">
        <div className="flex flex-col justify-center w-full h-full items-center text-center lg:text-left">
          <span
            ref={titleRef}
            className="font-xoireqe text-2xl md:text-3xl drop-shadow-lg hero-fresh-text lg:hero-fresh-text-lg content__title text-[1.7rem] md:text-[2.2rem] neon-green-mobile"
            style={{ lineHeight: 1.5 }}
          >
            HASSENE<br />AFIF
          </span>

          <div className="mx-auto mt-2 w-full md:w-[275px] flex flex-col items-center lg:items-start relative">
            {/* Job Title */}
            <span className="font-phitagate text-xl md:text-2xl w-full text-center lg:text-start hero-fresh-text lg:hero-fresh-text-lg neon-green-mobile">
              Software Engineer
            </span>

            {/* CV Button + Dropdown */}
            <div className="relative mt-4" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="font-xoireqe border border-white text-white bg-transparent w-[130px] h-[35px] rounded transition-colors duration-300 hover:bg-white hover:text-black"
              >
                CV
              </button>

              {showDropdown && (
                <div className="absolute left-0 mt-2 w-[130px] bg-black border border-white rounded shadow-lg flex flex-col z-20">
                  <a
                    href="/cv/CV-English.pdf"
                    download
                    onClick={() => setShowDropdown(false)}
                    className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors"
                  >
                    English
                  </a>
                  <a
                    href="/cv/CV-French.pdf"
                    download
                    onClick={() => setShowDropdown(false)}
                    className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors"
                  >
                    French
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes bg0Pulse {
          0% { filter: brightness(100%); }
          50% { filter: brightness(150%); }
          100% { filter: brightness(100%); }
        }
      `}</style>
    </section>
  );
};

export default HeroFresh;
