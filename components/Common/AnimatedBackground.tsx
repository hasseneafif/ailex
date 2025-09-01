"use client";
import React from "react";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute pb-[600px] inset-0 -z-20 flex items-center justify-center overflow-hidden">
      {/* Teal Circle (left) */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-3xl -translate-x-48"
        style={{ backgroundColor: "rgba(103, 255, 89, 0.3)" }}
      />

      {/* Purple Circle (right) */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-50 blur-3xl translate-x-48"
        style={{ backgroundColor: "rgba(92, 246, 187, 0.3)" }}
      />
    </div>
  );
};

export default React.memo(AnimatedBackground);
