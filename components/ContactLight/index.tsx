"use client";
import Image from "next/image";

const ContactLight = () => {
  return (
    <a
      href="mailto:hasseneafif@gmail.com"
      className="block group" // whole section clickable
    >
      <section
        id="contactlight"
        className="overflow-hidden flex flex-col items-center py-12 cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <Image
            src="/images/hero/contactlightimg.png"
            alt="Contact visual"
            width={400}
            height={100}
            className="mx-auto"
            style={{ objectFit: "contain" }}
            priority
          />
          <span
            className="mt-4 text-[#39ff14]  font-ubuntu text-base transition-colors duration-300 group-hover:text-red-500"
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

export default ContactLight;
