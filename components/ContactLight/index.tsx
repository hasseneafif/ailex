"use client";
import Image from "next/image";
import React, { useState, useRef, useCallback, useEffect } from "react";

const ContactLight = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  }, []);

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown, handleClickOutside]);

  return (

      <section
        id="contactlight"
              className="overflow-hidden flex flex-col items-center pt-12 pb-24 cursor-pointer"
        aria-labelledby="contactlight-heading"
      >
        <h2 id="contactlight-heading" className="sr-only">Contact</h2>
   

        <div className="flex flex-col items-center px-4">
                   <a
      href="mailto:hasseneafif@gmail.com"
      className="block group"
      aria-label="Send email to Hassene Afif"    >
          <Image
            src="/images/hero/contactlightimg.png"
            alt="Envelope and light visual for contact section"
            width={400}
            height={100}
            className="mx-auto mb-4"
            style={{ objectFit: "contain" }}
            draggable={false}
            priority
          />
          <span
            className="mt-6 text-[#39ff14] font-ubuntu text-base transition-colors duration-300 group-hover:text-red-500"
            style={{
              fontFamily: "Ubuntu, sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            Feel free to contact me.
          </span>
</a>
          {/* CV Button - full width, aligned start */}
          <div className="relative mt-4 w-[65px] self-start" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="font-xoireqe text-black bg-white rounded w-full h-8 transition-colors duration-300 hover:bg-gray-100"
            >
              CV
            </button>
            {showDropdown && (
              <div className="absolute left-0 mt-2 w-[180px] bg-black border border-white rounded shadow-lg flex flex-col z-20">
                <a
                  href="/cvs/Hassene_Afif_CV.pdf"
                  download
                  onClick={() => setShowDropdown(false)}
                  className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors"
                >
                  English
                </a>
                <a
                  href="/cvs/Hassene_Afif_CV_FR.pdf"
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
      </section>
  );
};

export default React.memo(ContactLight);
