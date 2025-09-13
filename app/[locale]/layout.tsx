import Footer from "@/components/Footer";
import Header from "@/components/Header";
// import LenisSmoothScroll from "@/components/Common/LenisSmoothScroll";
import "@/styles/index.min.css";
import { notFound } from "next/navigation";
import { Providers } from "./providers";

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
    <html suppressHydrationWarning lang={locale} >
<head>
  <meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover'></meta>
  </head>  

      <body className="bg-gradient-to-br from-[#000505] via-black to-[#000404]">
        {/* <LenisSmoothScroll /> */}
        <Providers locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
