
import { Metadata } from "next";
import MarketPage from "./market";


export const metadata: Metadata = {
  title: "Market - Vstr",
  description: "This is the Market Page for Vstr.ai",
  // other metadata
};


const MarketPageIndex = () => {
 
  return <MarketPage />;
};

export default MarketPageIndex;
