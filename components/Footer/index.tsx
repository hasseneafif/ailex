"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");
  // Dropdown state
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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

  // Reuse CV SVG
  const CvIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25.26 9.01"
      className="w-8 h-auto"
    >
      <g>
        <path
          fill="#ffffffff"
          d="M2.3,2.24v4.46h10.31v2.23H2.92c-.46,0-.84-.06-1.16-.19s-.63-.34-.94-.65c-.27-.28-.48-.56-.61-.83-.14-.28-.2-.59-.2-.95v-3.01c0-.62.06-1.12.19-1.49.16-.46.44-.85.85-1.19.33-.26.69-.44,1.08-.53.26-.06.68-.08,1.24-.08h9.25v2.23H2.3Z"
        />
        <path
          fill="#ffffffff"
          d="M22.72,0h2.54l-3.78,7.24c-.3.57-.6.99-.92,1.26-.4.34-.86.52-1.39.52-.58,0-1.1-.2-1.54-.61-.34-.31-.68-.8-1.02-1.48L13.03.04h2.58l3.52,6.66,3.59-6.7Z"
        />
      </g>
    </svg>
  );
  return (
    <footer
      className="wow fadeInUp relative z-10 pt-16 md:pt-20 lg:pt-24"
      data-wow-delay=".1s"
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        {t("title")}
      </h2>
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
            <div className="mb-12 lg:mb-16">
              <Link href="/" className="mb-8 w-40 inline-block" aria-label={t("homeLink")}>
                <Image
                  src="/images/logo/logo-black.svg"
                  alt={t("logoBlackAlt")}
                  className="w-[100px] dark:hidden"
                  width={48}
                  height={20}
                  priority
                />
                <Image
                  src="/images/logo/logo-white.svg"
                  alt={t("logoWhiteAlt")}
                  className="hidden w-[100px] dark:block"
                  width={48}
                  height={20}
                  priority
                />
              </Link>

              {/* Description */}
              <p className="text-white mb-6 text-base leading-relaxed  max-w-[360px]">
                How can i accept a limited definable self, when i feel limitless?
              </p>

              {/* Bottom row: icons */}
              <div className="flex flex-col md:flex-row items-center md:justify-between w-full gap-4 pb-6">
                <div className="flex items-center gap-6">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/hasseneafif"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("linkedinAria")}
                    className="dark:text-body-color-dark text-body-color duration-300 hover:text-primary dark:hover:text-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill="white"
                        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"
                      />
                    </svg>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:hasseneafif@gmail.com"
                    aria-label={t("emailAria")}
                    className="dark:text-body-color-dark text-body-color duration-300 hover:text-primary dark:hover:text-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill="white"
                        d="M3.87 4h13.25C18.37 4 19 4.59 19 5.79v8.42c0 1.19-.63 1.79-1.88 1.79H3.87c-1.25 0-1.88-.6-1.88-1.79V5.79c0-1.2.63-1.79 1.88-1.79zm6.62 8.6l6.74-5.53c.24-.2.43-.66.13-1.07c-.29-.41-.82-.42-1.17-.17l-5.7 3.86L4.8 5.83c-.35-.25-.88-.24-1.17.17c-.3.41-.11.87.13 1.07z"
                      />
                    </svg>
                  </a>

                  {/* Phone */}
                  <div className="relative group">
                    <button
                      type="button"
                      aria-label={t("phoneAria")}
                      className="dark:text-body-color-dark text-body-color duration-300 hover:text-primary dark:hover:text-primary focus:outline-none"
                      tabIndex={0}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          fill="white"
                          d="M12.2 10c-1.1-.1-1.7 1.4-2.5 1.8C8.4 12.5 6 10 6 10S3.5 7.6 4.1 6.3c.5-.8 2-1.4 1.9-2.5c-.1-1-2.3-4.6-3.4-3.6C.2 2.4 0 3.3 0 5.1c-.1 3.1 3.9 7 3.9 7c.4.4 3.9 4 7 3.9c1.8 0 2.7-.2 4.9-2.6c1-1.1-2.5-3.3-3.6-3.4z"
                        />
                      </svg>
                    </button>
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                      {t("phoneNumber")}
                    </span>
                  </div>
           {/* CV Dropdown */}
                  <div className="relative pb-1" ref={dropdownRef}>
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className=""
                      aria-haspopup="true"
                      aria-expanded={showDropdown}
                    >
                      {CvIcon}
                    </button>

                    {showDropdown && (
                      <div className="absolute right-0 bottom-full mb-2 w-[130px] bg-black border border-white rounded shadow-lg flex flex-col z-20">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
