import localFont from "next/font/local";

// Phitagate
export const phitagate = localFont({
  src: [
    {
      path: "../public/fonts/Phitagate-Regular.woff2",
      weight: "400",
      style: "normal",
      
    },
  ],
  variable: "--font-phitagate",
  display: "block",
});

// Ubuntu
export const ubuntu = localFont({
  src: [
    {
      path: "../public/fonts/Ubuntu-R.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-ubuntu",
  display: "block",
});

// XOIREQE
export const xoireqe = localFont({
  src: [
    {
      path: "../public/fonts/XOIREQE.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-xoireqe",
  display: "block",
});
