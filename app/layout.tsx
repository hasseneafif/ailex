import "@/styles/index.css";
import { Metadata } from "next";
import { LanguageProvider } from "@/lib/language-context";

export const metadata: Metadata = {
  title: "Ailex - EU",
  description: "Ailex : Your AI-Powered EU Law Expert",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black min-h-screen antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
