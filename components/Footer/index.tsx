"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="wow fadeInUp dark:bg-gray-dark relative z-10 bg-white pt-16 md:pt-20 lg:pt-24"
      data-wow-delay=".1s"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
            <div className="mb-12 lg:mb-16">
              <Link href="/" className="mb-8 w-40 inline-block">
                <Image
                  src="/images/logo/logo-black.svg"
                  alt="logo"
                  className="w-full dark:hidden"
                  width={48}
                  height={20}
                />
                <Image
                  src="/images/logo/logo-white.svg"
                  alt="logo"
                  className="hidden w-full dark:block"
                  width={48}
                  height={20}
                />
              </Link>

              {/* Description */}
              <p className="dark:text-body-color-dark mb-6 text-base leading-relaxed text-body-color max-w-[360px]">
               Designed, coded, animated and deployed by yours truly.
              </p>

              {/* Bottom row: icons - copyright - empty */}
              <div className="flex flex-col md:flex-row items-center md:justify-between w-full gap-4 pb-6">
                {/* Left: Icons */}
                <div className="flex items-center gap-6">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/yhasseneafif"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="dark:text-body-color-dark text-body-color duration-300 hover:text-primary dark:hover:text-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"
                      />
                    </svg>
                  </a>

                  {/* <a
                    href="https://github.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="dark:text-body-color-dark text-body-color duration-300 hover:text-primary dark:hover:text-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 432 416"
                      fill="none"
                      className="fill-current"
                    >
                      <path
                        fill="currentColor"
                        d="M213.5 0q88.5 0 151 62.5T427 213q0 70-41 125.5T281 416q-14 2-14-11v-58q0-27-15-40q44-5 70.5-27t26.5-77q0-34-22-58q11-26-2-57q-18-5-58 22q-26-7-54-7t-53 7q-18-12-32.5-17.5T107 88h-6q-12 31-2 57q-22 24-22 58q0 55 27 77t70 27q-11 10-13 29q-42 18-62-18q-12-20-33-22q-2 0-4.5.5t-5 3.5t8.5 9q14 7 23 31q1 2 2 4.5t6.5 9.5t13 10.5T130 371t30-2v36q0 13-14 11q-64-22-105-77.5T0 213q0-88 62.5-150.5T213.5 0z"
                      />
                    </svg>
                  </a> */}

                  {/* Email */}
                  <a
                    href="mailto:hasseneafif@gmail.com"
                    aria-label="Email"
                    className="dark:text-body-color-dark text-body-color duration-300 hover:text-primary dark:hover:text-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="white"
                        d="M3.87 4h13.25C18.37 4 19 4.59 19 5.79v8.42c0 1.19-.63 1.79-1.88 1.79H3.87c-1.25 0-1.88-.6-1.88-1.79V5.79c0-1.2.63-1.79 1.88-1.79zm6.62 8.6l6.74-5.53c.24-.2.43-.66.13-1.07c-.29-.41-.82-.42-1.17-.17l-5.7 3.86L4.8 5.83c-.35-.25-.88-.24-1.17.17c-.3.41-.11.87.13 1.07z"
                      />
                    </svg>
                  </a>

                  {/* Phone with tooltip */}
                  <div className="relative group">
                    <button
                      type="button"
                      aria-label="Phone"
                      className="dark:text-body-color-dark text-body-color duration-300 hover:text-primary dark:hover:text-primary focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="white"
                          d="M12.2 10c-1.1-.1-1.7 1.4-2.5 1.8C8.4 12.5 6 10 6 10S3.5 7.6 4.1 6.3c.5-.8 2-1.4 1.9-2.5c-.1-1-2.3-4.6-3.4-3.6C.2 2.4 0 3.3 0 5.1c-.1 3.1 3.9 7 3.9 7c.4.4 3.9 4 7 3.9c1.8 0 2.7-.2 4.9-2.6c1-1.1-2.5-3.3-3.6-3.4z"
                        />
                      </svg>
                    </button>
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                      +216 55 039 837
                    </span>
                  </div>
                </div>

                {/* Center: Copyright */}
                <div className="text-center flex-1 align-start align-self-start">
                  <span className="text-xs text-gray-500 dark:text-gray-400 float-left">
                    &copy; 2025 Hassene Afif
                  </span>
                </div>

     
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
