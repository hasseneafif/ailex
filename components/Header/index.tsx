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

  return (
    <header
      className={`header left-0 top-0 z-40 flex w-full items-center transition-all duration-500 ease-in-out opacity-100 translate-y-0 absolute bg-transparent
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
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                    aria-hidden="true"
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
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`flex py-2 text-[0.85rem] lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                              usePathName === menuItem.path
                                ? "text-black font-semibold lg:text-white"
                                : "text-black font-semibold lg:text-white"
                            }`}
                            tabIndex={0}
                            aria-current={usePathName === menuItem.path ? "page" : undefined}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <button
                              onClick={() => handleSubmenu(index)}
                              className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary lg:dark:text-white/70 lg:dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 bg-transparent border-none focus:outline-none"
                              aria-haspopup="true"
                              aria-expanded={openIndex === index}
                              aria-controls={`submenu-${index}`}
                              tabIndex={0}
                            >
                              {menuItem.title}
                              <span className="pl-3" aria-hidden="true">
                                <svg width="25" height="24" viewBox="0 0 25 24">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </button>
                            <div
                              id={`submenu-${index}`}
                              className={`submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                              role="menu"
                              aria-label={menuItem.title}
                            >
                              {menuItem.submenu.map((submenuItem, subIdx) => (
                                <Link
                                  href={submenuItem.path}
                                  key={subIdx}
                                  className="block rounded py-2.5 text-sm text-dark hover:text-primary lg:dark:text-white/70 lg:dark:hover:text-white lg:px-3"
                                  tabIndex={0}
                                >
                                  {submenuItem.title}
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                    
                    {/* CV Button for Mobile - Inside hamburger menu */}
                    <li className="group relative lg:hidden">
                      <div className="relative" ref={mobileDropdownRef}>
                        <button
                          onClick={() => setShowMobileDropdown(!showMobileDropdown)}
                          className="font-xoireqe text-black bg-white rounded transition-colors duration-300 hover:bg-gray-100 text-sm mt-2"
                        >
                          CV
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
                    className="font-xoireqe text-black xl:text-white border border-white bg-white xl:bg-transparent w-[65px] h-[32px] rounded transition-colors duration-300 hover:bg-white hover:text-black text-sm"
                  >
                    CV
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