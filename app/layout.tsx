
// import LenisSmoothScroll from "@/components/Common/LenisSmoothScroll";
import "@/styles/index.css";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Ailex - EU",
  description: "Ailex : Your AI-Powered EU Law Expert",
};
export default async function RootLayout({
  children,
}) {


  return (
    <html >
      <body className="bg-white min-h-screen">
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
          {children}
        </div>
      </body>
    </html>
  );
}
