import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LenisSmoothScroll from "@/components/Common/LenisSmoothScroll";
import "@/styles/index.min.css";
import { xoireqe } from "@/fonts/fonts";
import { notFound } from "next/navigation";
import { Providers } from "./providers";
import Script from "next/script"; // <-- import Script

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html suppressHydrationWarning lang={locale} className={xoireqe.variable}>
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

      <body className="bg-gradient-to-br from-[#000505] via-black to-[#000404]">
        <LenisSmoothScroll />
        <Providers locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
        </Providers>

        {/* Script pour logger les temps de chargement */}
      <Script id="perf-debug" strategy="afterInteractive">
  {`
    function logPerformance() {
      // Navigation timing
      const navEntries = performance.getEntriesByType("navigation");
      if (navEntries.length > 0) {
        const nav = navEntries[0];
        console.log("📊 Navigation Timing:");
        console.table({
          domInteractive: (nav.domInteractive / 1000).toFixed(2) + "s",
          domContentLoaded: (nav.domContentLoadedEventEnd / 1000).toFixed(2) + "s",
          fullLoad: (nav.loadEventEnd / 1000).toFixed(2) + "s"
        });
      } else {
        console.warn("Navigation entries not available yet");
      }

      // Resource timings
      const resources = performance.getEntriesByType("resource");
      if (resources.length > 0) {
        console.log("📦 Resource Timings (all):");
        resources.forEach(r => {
          console.log(r.name, {
            type: r.initiatorType,
            duration: (r.duration / 1000).toFixed(2) + "s",
            size: r.transferSize + " bytes"
          });
        });

        // Top 10 slowest
        const topResources = [...resources].sort((a, b) => b.duration - a.duration).slice(0, 10);
        console.log("⚡ Top 10 slowest resources:");
        topResources.forEach(r => {
          console.log(r.name, (r.duration / 1000).toFixed(2) + "s", r.initiatorType);
        });
      } else {
        console.warn("Resource entries not available yet");
      }
    }

    // Wait for full load
    if (document.readyState === "complete") {
      logPerformance();
    } else {
      window.addEventListener("load", logPerformance);
    }
  `}
</Script>

      </body>
    </html>
  );
}
