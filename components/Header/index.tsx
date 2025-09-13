"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import menuData from "./menuData";

import React, { useCallback } from "react";

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = useCallback(() => {
    setNavbarOpen((open) => !open);
  }, []);

  // Sticky Navbar & Hide at Top
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }

  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    // Set initial state on mount
    handleStickyNavbar();
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  }, []);

  // Mobile CV dropdown
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  
  // Desktop CV dropdown
  const [showDesktopDropdown, setShowDesktopDropdown] = useState(false);
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside for mobile dropdown
  const handleMobileClickOutside = useCallback((event: MouseEvent) => {
    if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
      setShowMobileDropdown(false);
    }
  }, []);
  
  // Handle click outside for desktop dropdown
  const handleDesktopClickOutside = useCallback((event: MouseEvent) => {
    if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target as Node)) {
      setShowDesktopDropdown(false);
    }
  }, []);

  useEffect(() => {
    if (showMobileDropdown) {
      document.addEventListener("mousedown", handleMobileClickOutside);
    } else {
      document.removeEventListener("mousedown", handleMobileClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleMobileClickOutside);
  }, [showMobileDropdown, handleMobileClickOutside]);

  useEffect(() => {
    if (showDesktopDropdown) {
      document.addEventListener("mousedown", handleDesktopClickOutside);
    } else {
      document.removeEventListener("mousedown", handleDesktopClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleDesktopClickOutside);
  }, [showDesktopDropdown, handleDesktopClickOutside]);

  const usePathName = usePathname();
// Define the SVG once
const CvIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25.26 9.01"
    className="w-8 h-auto"
  >
    <g>
      <path
        fill="#231f20"
        d="M2.3,2.24v4.46h10.31v2.23H2.92c-.46,0-.84-.06-1.16-.19s-.63-.34-.94-.65c-.27-.28-.48-.56-.61-.83-.14-.28-.2-.59-.2-.95v-3.01c0-.62.06-1.12.19-1.49.16-.46.44-.85.85-1.19.33-.26.69-.44,1.08-.53.26-.06.68-.08,1.24-.08h9.25v2.23H2.3Z"
      />
      <path
        fill="#231f20"
        d="M22.72,0h2.54l-3.78,7.24c-.3.57-.6.99-.92,1.26-.4.34-.86.52-1.39.52-.58,0-1.1-.2-1.54-.61-.34-.31-.68-.8-1.02-1.48L13.03.04h2.58l3.52,6.66,3.59-6.7Z"
      />
    </g>
  </svg>
);

  return (
    <header
      className={`header left-0 top-0 z-40 flex w-full items-center  fixed bg-transparent
      `}
      role="banner"
      aria-label="Main site header"
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-40 max-w-full px-4 xl:mr-12">
            <Link
              href="/"
              className={`header-logo block w-full ${
                sticky ? "py-5 lg:py-2" : "py-8"
              } `}
              aria-label="Go to homepage"
            >
              <Image
                src="/images/logo/logo-white.svg"
                alt="Hassene Afif logo"
                width={50}
                height={20}
                className="w-[90px] "
                priority
              />
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div className="flex items-center justify-between w-full">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Toggle mobile menu"
                  aria-controls="navbarCollapse"
                  aria-expanded={navbarOpen}
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
              <span
  className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 ${
    navbarOpen ? " top-[7px] rotate-45" : " "
  }`}
/>
<span
  className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 ${
    navbarOpen ? "opacity-0 " : " "
  }`}
/>
<span
  className={`relative my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 ${
    navbarOpen ? " top-[-8px] -rotate-45" : " "
  }`}
/>

                </button>
            
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                  role="navigation"
                  aria-label="Main navigation"
                >
                  <ul className="block lg:flex lg:space-x-12">
                   
                    
                    {/* CV Button for Mobile - Inside hamburger menu */}
                    <li className="group relative lg:hidden">
                      <div className="relative" ref={mobileDropdownRef}>
                      <button
  onClick={() => setShowMobileDropdown(!showMobileDropdown)}
  className="bg-white pb-2 rounded transition-colors duration-300 hover:bg-gray-100  mt-2 flex items-center justify-center"
>
{CvIcon}
</button>

                        {showMobileDropdown && (
                          <div
                            className="absolute left-0 mt-2 w-[130px] bg-black border border-white rounded shadow-lg flex flex-col z-20"
                          >
                            <a
                              href="/cvs/Hassene_Afif_CV.pdf"
                              download
                              onClick={() => setShowMobileDropdown(false)}
                              className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors"
                            >
                              English
                            </a>
                            <a
                              href="/cvs/Hassene_Afif_CV_FR.pdf"
                              download
                              onClick={() => setShowMobileDropdown(false)}
                              className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors"
                            >
                              French
                            </a>
                          </div>
                        )}
                      </div>
                    </li>

                  </ul>
                </nav>
              </div>
              
              {/* CV Button for Desktop - Far right */}
              <div className="hidden lg:block">
                <div className="relative" ref={desktopDropdownRef}>
                <button
  onClick={() => setShowDesktopDropdown(!showDesktopDropdown)}
  className="bg-white rounded transition-colors duration-300 hover:bg-gray-100 p-2 flex items-center justify-center w-[65px] h-[32px]"
>
{CvIcon}

</button>

                  {showDesktopDropdown && (
                    <div
                      className="absolute right-0 mt-2 w-[130px] bg-black border border-white rounded shadow-lg flex flex-col z-20"
                    >
                      <a
                        href="/cvs/Hassene_Afif_CV.pdf"
                        download
                        onClick={() => setShowDesktopDropdown(false)}
                        className="px-4 py-2 text-white hover:bg-white hover:text-black transition-colors"
                      >
                        English
                      </a>
                      <a
                        href="/cvs/Hassene_Afif_CV_FR.pdf"
                        download
                        onClick={() => setShowDesktopDropdown(false)}
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
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);