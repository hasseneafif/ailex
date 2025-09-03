"use client";
import React, { memo } from "react";
import {  TrendingUp } from "lucide-react";
// import { usePingStore } from "./Helpers/pingStore";
import { motion } from "framer-motion";
import StaticIDEHero from "./StaticIDE";
import AnimatedBackground from "../Common/AnimatedBackground";

const HeroFresh: React.FC = () => {


  // const { ping, pinged } = usePingStore();

  // useEffect(() => {
  //   ping();
  // }, [ping]);


  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden min-h-[90vh] md:min-h-[100vh] h-full flex items-center justify-center "
    >
      <div className="flex flex-col pt-[110px] md:pt-[140px]">
       <AnimatedBackground /> 


      {/* Main content */}
      <div className="flex flex-col items-center justify-center text-center relative px-6 max-w-4xl mx-auto mb-12">
   



 
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-white"
>
  Where{" "}
  <span className="bg-gradient-to-r from-teal-300 to-purple-300 bg-clip-text text-transparent animate-gradient-x">
    AI
  </span>{" "}
  innovation meets{" "}
  <span className="bg-gradient-to-r from-teal-300 to-purple-300 bg-clip-text text-transparent animate-gradient-x">
    Software
  </span>{" "}
  excellence.
</motion.h1>



    <motion.p 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-white text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12 "
    >
      Meet Hassene Afif.
    </motion.p>

        {/* Feature Highlights */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-gray-300 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span>AI Products</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-200"></div>
            <span>Full-Stack Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse delay-400"></div>
            <span>Unmateched Design</span>
          </div>
        </div>
 
      </div>

   
      <StaticIDEHero />
      </div>
    </section>
  );
};

export default memo(HeroFresh);
