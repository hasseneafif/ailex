"use client";
import React from "react";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute pb-[600px] inset-0 -z-20 flex items-center justify-center overflow-hidden">
      {/* Teal Circle (left) - animated */}
      <div
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full opacity-30 blur-3xl animate-float-left"
        style={{ backgroundColor: "rgba(103, 255, 89, 0.3)" }}
      />

      {/* Purple Circle (right) - animated */}
      <div
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full opacity-50 blur-3xl animate-float-right"
        style={{ backgroundColor: "rgba(92, 246, 187, 0.3)" }}
      />

      <style jsx>{`
        @keyframes float-left {
          0% {
            transform: translate(-120px, -60px);
          }
          25% {
            transform: translate(-80px, -40px);
          }
          50% {
            transform: translate(-100px, 20px);
          }
          75% {
            transform: translate(-140px, -20px);
          }
          100% {
            transform: translate(-120px, -60px);
          }
        }

        @keyframes float-right {
          0% {
            transform: translate(120px, 40px);
          }
          25% {
            transform: translate(160px, 60px);
          }
          50% {
            transform: translate(140px, -10px);
          }
          75% {
            transform: translate(100px, 30px);
          }
          100% {
            transform: translate(120px, 40px);
          }
        }

        @media (min-width: 768px) {
          @keyframes float-left {
            0% {
              transform: translate(-192px, -80px);
            }
            25% {
              transform: translate(-160px, -60px);
            }
            50% {
              transform: translate(-180px, 40px);
            }
            75% {
              transform: translate(-220px, -30px);
            }
            100% {
              transform: translate(-192px, -80px);
            }
          }

          @keyframes float-right {
            0% {
              transform: translate(192px, 60px);
            }
            25% {
              transform: translate(240px, 80px);
            }
            50% {
              transform: translate(220px, -20px);
            }
            75% {
              transform: translate(180px, 50px);
            }
            100% {
              transform: translate(192px, 60px);
            }
          }
        }

        .animate-float-left {
          animation: float-left 4s ease-in-out infinite;
        }

        .animate-float-right {
          animation: float-right 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default React.memo(AnimatedBackground);