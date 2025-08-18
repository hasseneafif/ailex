"use client"
import React from "react";

const skillLogos = [
  // AI-related
  { src: "ml.png", width: 110, height: 60 },
  { src: "llama.png", width: 70, height: 60 },
  { src: "gpt.png", width: 70, height: 60 },
  { src: "finetuning.png", width: 90, height: 60 },
  { src: "prompt.png", width: 60, height: 60 },
  { src: "n8n.png", width: 100, height: 60 },
  { src: "python.png", width: 60, height: 60 },
  // Software (languages, frameworks, tools)
  { src: "js.png", width: 40, height: 60 },
  { src: "ts.png", width: 40, height: 60 },
  { src: "react.png", width: 60, height: 60 },
  { src: "node.png", width: 70, height: 60 },
  { src: "next.png", width: 80, height: 60 },
  { src: "java.png", width: 70, height: 60 },
  { src: "laravel.png", width: 100, height: 60 },
  { src: "sql.png", width: 80, height: 60 },
  { src: "mongo.png", width: 120, height: 60 },
  { src: "docker.png", width: 70, height: 60 },
];

const Skills = () => {
  return (
    <section
      className="py-16 md:py-0 md:pt-16 md:pb-8"
      style={{ background: "rgb(245,245,245)", width: "100vw", position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw" }}
    >
      {/* Desktop/Tablet: Grid layout, no animation */}
      {/* Desktop: Responsive balanced rows, centered (lg and up) */}
      <div className="hidden lg:flex flex-col items-center w-full px-4 md:px-12 lg:px-32">
        {(() => {
          // Always 2 rows for desktop
          const total = skillLogos.length;
          const numRows = 2;
          const base = Math.floor(total / numRows);
          const extra = total % numRows;
          const rows = [];
          let idx = 0;
          for (let i = 0; i < numRows; i++) {
            const count = base + (i < extra ? 1 : 0);
            rows.push(skillLogos.slice(idx, idx + count));
            idx += count;
          }
          return rows.map((row, i) => (
            <div key={i} className="flex flex-row justify-center items-center gap-20 2xl:gap-20 lg:gap-12 mb-8">
              {row.map((logo, idx) => (
                <img
                  key={logo.src + idx}
                  src={`/images/skills/new/1x/${logo.src}`}
                  alt={logo.src.replace('.png', '')}
                  width={logo.width}
                  height={logo.height}
                  className="select-none opacity-90"
                  draggable="false"
                  style={{ userSelect: 'none', width: logo.width, height: logo.height, objectFit: 'contain' }}
                />
              ))}
            </div>
          ));
        })()}
      </div>
      {/* Mobile/Tablet: Animated slider (md and down) */}
      <div className="lg:hidden overflow-hidden w-full relative" style={{ width: "100vw" }}>
        <div
          className="flex items-center gap-20 animate-skills-slider"
          style={{
            width: "max-content",
            animation: "skillsSlider 30s linear infinite",
          }}
        >
          {skillLogos.concat(skillLogos).map((logo, idx) => (
            <img
              key={idx}
              src={`/images/skills/new/1x/${logo.src}`}
              alt={logo.src.replace(".png", "")}
              width={logo.width}
              height={logo.height}
              className="select-none pointer-events-none opacity-90"
              draggable="false"
              style={{ userSelect: "none", width: logo.width, height: logo.height, objectFit: "contain" }}
            />
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes skillsSlider {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-skills-slider {
          display: flex;
        }
      `}</style>
    </section>
  );
};

export default Skills;
