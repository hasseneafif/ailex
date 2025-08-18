"use client"
import React from "react";

const skillLogos = [
  "docker.png",
  "finetuning.png",
  "gpt.png",
  "java.png",
  "js.png",
  "laravel.png",
  "llama.png",
  "ml.png",
  "mongo.png",
  "n8n.png",
  "next.png",
  "node.png",
  "prompt.png",
  "python.png",
  "react.png",
  "sql.png",
  "ts.png",
];

const Skills = () => {
  return (
    <section className="py-16" style={{ background: "rgb(242,242,242)" }}>
      <div className="container mx-auto px-4">
        <div className="overflow-hidden w-full relative">
          <div
            className="flex items-center gap-12 animate-skills-slider"
            style={{
              width: "max-content",
              animation: "skillsSlider 30s linear infinite",
            }}
          >
            {skillLogos.concat(skillLogos).map((logo, idx) => (
              <img
                key={idx}
                src={`/images/skills/new/1x/${logo}`}
                alt={logo.replace(".png", "")}
                className="h-16 w-auto select-none pointer-events-none opacity-90"
                draggable="false"
                style={{ userSelect: "none" }}
              />
            ))}
          </div>
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
