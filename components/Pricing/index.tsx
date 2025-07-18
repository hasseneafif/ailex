// "use client";
// import { useState } from "react";
// import SectionTitle from "../Common/SectionTitle";
// import OfferList from "./OfferList";
// import PricingBox from "./PricingBox";

// const Pricing = () => {
//   const [isMonthly, setIsMonthly] = useState(true);

//   return (
//     <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
//       <div className="container">
//         <SectionTitle
//           title="Simple and Affordable Pricing"
//           paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
//           center
//           width="665px"
//         />

//         <div className="w-full">
//           <div
//             className="wow fadeInUp mb-8 flex justify-center md:mb-12 lg:mb-16"
//             data-wow-delay=".1s"
//           >
//             <span
//               onClick={() => setIsMonthly(true)}
//               className={`${
//                 isMonthly
//                   ? "pointer-events-none text-primary"
//                   : "text-dark dark:text-white"
//               } mr-4 cursor-pointer text-base font-semibold`}
//             >
//               Monthly
//             </span>
//             <div
//               onClick={() => setIsMonthly(!isMonthly)}
//               className="flex cursor-pointer items-center"
//             >
//               <div className="relative">
//                 <div className="h-5 w-14 rounded-full bg-[#1D2144] shadow-inner"></div>
//                 <div
//                   className={`${
//                     isMonthly ? "" : "translate-x-full"
//                   } shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-primary transition`}
//                 >
//                   <span className="active h-4 w-4 rounded-full bg-white"></span>
//                 </div>
//               </div>
//             </div>
//             <span
//               onClick={() => setIsMonthly(false)}
//               className={`${
//                 isMonthly
//                   ? "text-dark dark:text-white"
//                   : "pointer-events-none text-primary"
//               } ml-4 cursor-pointer text-base font-semibold`}
//             >
//               Yearly
//             </span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
//           <PricingBox
//             packageName="Lite"
//             price={isMonthly ? "40" : "120"}
//             duration={isMonthly ? "mo" : "yr"}
//             subtitle="Lorem ipsum dolor sit amet adiscing elit Mauris egestas enim."
//           >
//             <OfferList text="All UI Components" status="active" />
//             <OfferList text="Use with Unlimited Projects" status="active" />
//             <OfferList text="Commercial Use" status="active" />
//             <OfferList text="Email Support" status="active" />
//             <OfferList text="Lifetime Access" status="inactive" />
//             <OfferList text="Free Lifetime Updates" status="inactive" />
//           </PricingBox>
//           <PricingBox
//             packageName="Basic"
//             price={isMonthly ? "399" : "789"}
//             duration={isMonthly ? "mo" : "yr"}
//             subtitle="Lorem ipsum dolor sit amet adiscing elit Mauris egestas enim."
//           >
//             <OfferList text="All UI Components" status="active" />
//             <OfferList text="Use with Unlimited Projects" status="active" />
//             <OfferList text="Commercial Use" status="active" />
//             <OfferList text="Email Support" status="active" />
//             <OfferList text="Lifetime Access" status="active" />
//             <OfferList text="Free Lifetime Updates" status="inactive" />
//           </PricingBox>
//           <PricingBox
//             packageName="Plus"
//             price={isMonthly ? "589" : "999"}
//             duration={isMonthly ? "mo" : "yr"}
//             subtitle="Lorem ipsum dolor sit amet adiscing elit Mauris egestas enim."
//           >
//             <OfferList text="All UI Components" status="active" />
//             <OfferList text="Use with Unlimited Projects" status="active" />
//             <OfferList text="Commercial Use" status="active" />
//             <OfferList text="Email Support" status="active" />
//             <OfferList text="Lifetime Access" status="active" />
//             <OfferList text="Free Lifetime Updates" status="active" />
//           </PricingBox>
//         </div>
//       </div>

 
//     </section>
//   );
// };

// export default Pricing;
