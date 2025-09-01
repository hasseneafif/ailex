import Image from "next/image";
import React from "react";

const Certifs = () => {
  return (
    <section className="py-8 md:py-16"  aria-labelledby="certifs-heading">
      <h2 id="certifs-heading" className="sr-only">Certifications</h2>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-4xl px-4 py-8 flex flex-col items-center relative bg-transparent shadow-none">
            <div className="flex flex-row flex-wrap justify-center items-center gap-6 sm:gap-12 md:gap-24 lg:gap-32 w-full" role="list" aria-label="Certifications">
              <span role="listitem">
                <Image
                  src="/images/certif/board.svg"
                  alt="Board Certification logo"
                  width={80}
                  height={32}
                  className="h-8 sm:h-8 md:h-6 w-auto max-w-[80px] sm:max-w-[100px] md:max-w-none mx-auto skill-pop"
                  loading="lazy"
                    draggable={false}

                />
              </span>
              <span role="listitem">
                <Image
                  src="/images/certif/ibm.svg"
                  alt="IBM Certification logo"
                  width={60}
                  height={48}
                  className="h-8 sm:h-8 md:h-8 w-auto max-w-[70px] sm:max-w-[70px] md:max-w-[200px] mx-auto skill-pop"
                  loading="lazy"
                    draggable={false}

                />
              </span>
              <span role="listitem">
                <Image
                  src="/images/certif/intel.svg"
                  alt="Intel Certification logo"
                  width={100}
                  height={48}
                  className="h-8 sm:h-8 md:h-10 w-auto max-w-[80px] sm:max-w-[100px] md:max-w-none mx-auto skill-pop"
                  loading="lazy"
                    draggable={false}

                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Certifs);
