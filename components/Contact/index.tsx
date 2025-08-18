// "use client"
// import Image from "next/image";

// const Contact = () => {
//   return (
//     <section
//       id="contact"
//       className="relative min-h-[80vh] flex items-center justify-center bg-black py-16 md:py-20 lg:py-28 xl:px-40 overflow-hidden"
//     >
//       <div className="w-full flex flex-col md:flex-row items-center justify-center gap-0 md:gap-[30px] relative">
        
//         {/* Image + caption absolutely placed */}
//         <div className="relative flex-shrink-0 flex justify-start md:justify-end z-10">
//           <Image
//             src="/images/hero/contacthbg.png"
//             alt="Contact visual"
//             width={180}
//             height={200}
//             className="shadow-2xl"
//             priority
//           />
//           <span
//             className="absolute left-2 md:w-[150%] md:left-0 -bottom-12 text-xs text-red-500 font-ubuntu tracking-wide"
//             style={{ fontFamily: "Ubuntu, sans-serif" }}
//           >
//             Feel free to reach out for any inquiries or collaborations.
//           </span>
//         </div>

//         {/* Form */}
//         <div className="w-full md:w-1/2 flex flex-col items-start justify-center z-20 md:ml-0 relative">
//           <h2
//             className="font-xoireqe text-white text-xl sm:text-2xl md:text-2xl mb-8 tracking-widest text-left"
//             style={{ fontFamily: "XOIREQE, sans-serif" }}
//           >
//             CONTACT ME
//           </h2>
//           <form className="w-full max-w-[400px] flex flex-col gap-6 md:mr-0 mr-4">
//             <input
//               type="text"
//               placeholder="Name"
//               className="bg-[#18181b] text-white placeholder-gray-400 px-5 py-4 outline-none focus:ring-2 focus:ring-white/30 transition"
//               autoComplete="off"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               className="bg-[#18181b] text-white placeholder-gray-400 px-5 py-4 outline-none focus:ring-2 focus:ring-white/30 transition"
//               autoComplete="off"
//             />
//             <textarea
//               placeholder="Message"
//               rows={4}
//               className="bg-[#18181b] text-white placeholder-gray-400 px-5 py-4 outline-none focus:ring-2 focus:ring-white/30 transition resize-none"
//             />
//             {/* <button
//               type="submit"
//               className="mt-2 bg-white text-black font-semibold rounded-lg px-5 py-3 hover:bg-gray-200 transition"
//             >
//               Send
//             </button> */}
//           </form>
//         </div>
//       </div>

//       {/* Mobile overlay effect */}
//       <style jsx>{`
//         @media (max-width: 768px) {
//           section#contact {
//             padding-left: 0;
//             padding-right: 0;
//           }
//           section#contact > div {
//             flex-direction: row;
//             align-items: flex-start;
//           }
//           section#contact > div > div:first-child {
//             position: absolute;
//             left: 0;
//             top: 50%;
//             transform: translateY(-50%);
//             width: 60vw;
//             min-width: 140px;
//             max-width: 80vw;
//             z-index: 5;
//             opacity: 0.9;
//           }
//           section#contact > div > div:last-child {
//             position: relative;
//             width: 75vw;
//             margin-left: auto;
//             margin-right: 4vw;
//             z-index: 10;
//             background: transparent;
//           }
//           section#contact h2 {
//             text-align: left;
//             margin-bottom: 2rem;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Contact;
