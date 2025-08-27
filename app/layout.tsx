"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/Common/LenisSmoothScroll";
 import "../styles/index.min.css";
// import "../styles/index.css";
import { phitagate, ubuntu, xoireqe } from "@/fonts/fonts";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en"  className={`${phitagate.variable} ${ubuntu.variable} ${xoireqe.variable}`}>

      <head>
          {/* Preload XOIREQE */}
        <link
          rel="preload"
          href="/fonts/XOIREQE.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* <link rel="preload" as="image" href="/images/hero/new/ndesktop.png" />
        <link rel="preload" as="image" href="/images/hero/new/nmobile.png" /> */}

             {/* Preload Phitagate */}
        <link
          rel="preload"
          href="../fonts/Phitagate-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Preload Ubuntu */}
        {/* <link
          rel="preload"
          href="/fonts/Ubuntu-R.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        /> */}

      
      </head>

      <body className={`bg-[#FCFCFC] bg-black`}>
        <LenisSmoothScroll />
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
