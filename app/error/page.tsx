import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error - Vstr",
  description: "This is Error Page for Vstr.ai",
  // other metadata
};


const ErrorPage = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="w-full max-w-md mx-auto text-center px-6 py-12">
        <h1 className="font-xoireqe text-white text-4xl md:text-5xl mb-6 tracking-wide">404 - Not Found</h1>
        <p className="text-white/80 mb-10 text-lg">The page you were looking for appears to have been moved, deleted or does not exist.</p>
        <Link
          href="/"
          className="inline-block font-xoireqe border border-white text-white text-lg px-8 py-3 rounded transition-colors duration-300 hover:bg-white hover:text-black focus:outline-none"
        >
          Back to Homepage
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
