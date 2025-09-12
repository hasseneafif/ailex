"use client";
import React from "react";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-20 flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Teal Circle */}
      <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full opacity-50 blur-2xl animate-float-left bg-teal-400/30" />

      {/* Purple Circle */}
      <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full opacity-40 blur-2xl animate-float-right bg-purple-400/30" />

      <style jsx>{`
        @keyframes float-left {
          0%, 100% { transform: translate3d(-100px, -20px, 0); }
          50% { transform: translate3d(-120px, 20px, 0); }
        }

        @keyframes float-right {
          0%, 100% { transform: translate3d(100px, 20px, 0); }
          50% { transform: translate3d(120px, -20px, 0); }
        }

        .animate-float-left { animation: float-left 6s ease-in-out infinite; }
        .animate-float-right { animation: float-right 6s ease-in-out infinite; }

        @media (min-width: 768px) {
          @keyframes float-left {
            0%, 100% { transform: translate3d(-160px, -40px, 0); }
            50% { transform: translate3d(-180px, 40px, 0); }
          }

          @keyframes float-right {
            0%, 100% { transform: translate3d(160px, 40px, 0); }
            50% { transform: translate3d(180px, -40px, 0); }
          }
        }
      `}</style>
    </div>
  );
};

export default React.memo(AnimatedBackground);
