"use client";
import Image from "next/image";

import React from "react";

const ContactLight = () => {
  return (
    <a
      href="mailto:hasseneafif@gmail.com"
      className="block group"
      aria-label="Send email to Hassene Afif"
    >
      <section
        id="contactlight"
        className="overflow-hidden flex flex-col items-center py-12 cursor-pointer"
        aria-labelledby="contactlight-heading"
      >
        <h2 id="contactlight-heading" className="sr-only">Contact</h2>
        <div className="flex flex-col items-center">
          <Image
            src="/images/hero/contactlightimg.png"
            alt="Envelope and light visual for contact section"
            width={400}
            height={100}
            className="mx-auto"
            style={{ objectFit: "contain" }}
            priority
          />
          <span
            className="mt-4 text-[#39ff14] font-ubuntu text-base transition-colors duration-300 group-hover:text-red-500"
            style={{
              fontFamily: "Ubuntu, sans-serif",
              alignSelf: "flex-start",
              letterSpacing: "0.05em",
            }}
          >
            Feel free to contact me.
          </span>
        </div>
      </section>
    </a>
  );
};

export default React.memo(ContactLight);
