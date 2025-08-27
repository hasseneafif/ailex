"use client";
import React, { useState, useRef, useCallback } from "react";

const CvButton: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  }, []);

  React.useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown, handleClickOutside]);

  return (
    <div className={`relative align-start w-full ${isMobile ? "inline-block" : ""}`} ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`font-xoireqe text-black ${
          isMobile ? "bg-white" : "xl:text-white border border-white bg-white xl:bg-transparent"
        } w-[65px] h-[32px] rounded transition-colors duration-300 hover:bg-white hover:text-black text-sm`}
      >
        CV
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-[130px] bg-black border border-white rounded shadow-lg flex flex-col z-20">
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
  );
};

export default React.memo(CvButton);
