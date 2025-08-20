"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";

// Helper functions for dynamic imports
const getGsap = () => import("gsap");
const getScrollTrigger = () => import("gsap/ScrollTrigger");

// Letters and symbols for animation
const lettersAndSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=~".split("");

const HeroFresh: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!titleRef.current) return;
    let gsapInstance: any;
    let ScrollTriggerInstance: any;
    let cleanup: (() => void) | undefined;
    let isMounted = true;

    Promise.all([getGsap(), getScrollTrigger(), import("splitting")]).then(
      ([gsapModule, scrollTriggerModule, SplittingModule]) => {
        if (!isMounted || !titleRef.current) return;
        gsapInstance = gsapModule.default;
        ScrollTriggerInstance = scrollTriggerModule.ScrollTrigger;
        gsapInstance.registerPlugin(ScrollTriggerInstance);
        const Splitting = SplittingModule.default;
        Splitting({ target: titleRef.current, by: "chars" });

        const animateChars = () => {
          if (!isMounted || !titleRef.current) return;
          const chars = titleRef.current.querySelectorAll(".char");
          chars.forEach((char: any, position: number) => {
            const initialHTML = char.innerHTML;
            gsapInstance.fromTo(
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
                onComplete: () => gsapInstance.set(char, { innerHTML: initialHTML }),
              }
            );
          });
        };

        animateChars();
        const st = ScrollTriggerInstance.create({
          trigger: titleRef.current,
          start: "top 80%",
          onEnterBack: animateChars,
        });
        cleanup = () => {
          st && st.kill && st.kill();
        };
      }
    );
    return () => {
      isMounted = false;
      cleanup && cleanup();
    };
  }, []);

  // Debounced handler for dropdown close
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    },
    []
  );
  useEffect(() => {
    if (showDropdown) {
      const timeout = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 50); // debounce
      return () => {
        clearTimeout(timeout);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, handleClickOutside]);

  return (

// ...rest of the component code remains unchanged...
  <section
    id="home"
    className="relative z-10 overflow-hidden min-h-[90vh] md:min-h-[100vh] h-full pb-16 pt-[120px] md:pb-[180px] md:pt-[200px] xl:pb-[220px] xl:pt-[240px] 2xl:pb-[260px] 2xl:pt-[280px] flex flex-col items-center justify-center bg-black"
  >
    {/* Background images */}
    <div className="absolute inset-0 z-[-1] w-full h-full flex items-center justify-center lg:ml-20 lg:justify-start" aria-hidden="true">
      <div className="flex flex-col">
        <div className="flex flex-row items-end justify-center" style={{ gap: 30 }}>
          <div className="relative hero-img-wrapper" style={{ width: "auto", height: "60vh", minWidth: 0 }}>
            <Image
              src="/images/hero/hbg0.png"
              alt="Decorative profile background 1"
              width={320}
              height={600}
              className="object-contain hero-bg-img"
              style={{ objectFit: "contain", height: "100%", width: "auto", maxWidth: "100%" }}
              priority={true}
              fetchPriority="high"
              loading="eager"
              draggable={false}
            />
          </div>
          <div className="relative hero-img-wrapper" style={{ width: "auto", height: "60vh", minWidth: 0 }}>
            <Image
              src="/images/hero/hbg2.png"
              alt="Decorative profile background 2"
              width={320}
              height={600}
              className="object-contain hero-bg-img"
              style={{ objectFit: "contain", height: "100%", width: "auto", maxWidth: "100%" }}
              priority={false}
              loading="lazy"                draggable={false}

            />
          </div>
        </div>
        <span
          className="mt-6 hidden md:block"
          style={{ color: "#e11d48", fontSize: "0.95rem", letterSpacing: "0.05em" }}
          aria-hidden="true"
        >
          花は桜木、人は武士されど桜は 時の花、人の心は永遠に咲く。
        </span>
      </div>
    </div>

    {/* Main content */}
    <div className="container flex flex-col items-center justify-center h-full relative">
      <div className="flex flex-col justify-center w-full h-full items-center text-center lg:text-left">
        <h1
          ref={titleRef}
          className="font-xoireqe text-2xl md:text-3xl drop-shadow-lg hero-fresh-text lg:hero-fresh-text-lg content__title text-[1.7rem] md:text-[2.2rem] neon-green-mobile"
          style={{ lineHeight: 1.5 }}
          tabIndex={0}
        >
          HASSENE<br />AFIF
        </h1>

        <div className="mx-auto mt-2 w-full md:w-[275px] flex flex-col items-center lg:items-start relative">
          {/* Job Title */}
          <span className="font-phitagate text-xl md:text-2xl w-full text-center lg:text-start hero-fresh-text lg:hero-fresh-text-lg neon-green-mobile" id="job-title">
            Software Engineer
          </span>

          {/* CV Button + Dropdown */}
          <div className="relative mt-4" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="font-xoireqe text-black xl:text-white  border border-white bg-white xl:bg-transparent w-[130px] h-[35px] rounded transition-colors duration-300 hover:bg-white hover:text-black"
              aria-haspopup="listbox"
              aria-expanded={showDropdown}
              aria-controls="cv-dropdown"
              aria-label="Download CV"
            >
              CV
            </button>

            {showDropdown && (
              <div
                id="cv-dropdown"
                role="listbox"
                aria-label="CV Download Options"
                className="absolute left-0 mt-2 w-[130px] bg-black border border-white rounded shadow-lg flex flex-col z-20"
              >
                <a
                  href="/cvs/Hassene_Afif_CV.pdf"
                  download
                  onClick={() => setShowDropdown(false)}
                  className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors"
                  role="option"
                  aria-selected="false"
                >
                  English
                </a>
                <a
                  href="/cvs/Hassene_Afif_CV_FR.pdf"
                  download
                  onClick={() => setShowDropdown(false)}
                  className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors"
                  role="option"
                  aria-selected="false"
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

export default React.memo(HeroFresh);
