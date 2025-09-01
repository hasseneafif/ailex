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

      {/* Gradient overlay */}
      {/* <div className="absolute inset-0 bg-black/30 z-[-1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-[-1]" /> */}

      {/* Main content */}
      <div className="flex flex-col items-center justify-center text-center relative px-6 max-w-4xl mx-auto mb-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium mb-8">
          <TrendingUp className="w-4 h-4 text-blue-400" />
          <span>Hassene Afif</span>
        </div>


        {/* CTA Buttons */}
        {/* <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/market">
            <button className="flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-500  to-teal-200 rounded-xl hover:scale-105 transition-transform duration-300">
              <BarChart3 className="w-5 h-5" />
              Voir les Prédictions
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <Link href="/#features-heading">

          <button className="flex items-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/30 rounded-xl hover:bg-white/10 transition-colors duration-300">
            En savoir plus
            <ArrowRight className="w-4 h-4" />
          </button>
                    </Link>

        </div> */}

 

    <motion.h1 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-200 to-purple-200 text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
    >
     Where AI innovation meets software excellence.
      </motion.h1>

    <motion.p 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-white text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12"
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
