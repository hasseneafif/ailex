"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LenisSmoothScroll from "@/components/Common/LenisSmoothScroll";
 import "../styles/index.min.css";
// import "../styles/index.css";
import {  xoireqe } from "@/fonts/fonts";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en"  className={` ${xoireqe.variable}`}>

      <head>
          {/* Preload XOIREQE */}
        <link
          rel="preload"
          href="/fonts/XOIREQE.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
 

      
      </head>

      <body className={`bg-gradient-to-br from-[#000505] via-black to-[#000404]


`}>
        <LenisSmoothScroll />
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";

