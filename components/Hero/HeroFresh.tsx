"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import HeroFreshDesktop from "./HeroFreshContent";

const HeroFresh: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Handle resize
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Dropdown click outside
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

  return     <HeroFreshDesktop titleRef={titleRef} dropdownRef={dropdownRef} showDropdown={showDropdown} setShowDropdown={setShowDropdown} />

};

export default HeroFresh;
