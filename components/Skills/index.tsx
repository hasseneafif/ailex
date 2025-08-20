"use client"
import React, { useMemo } from "react";
import Image from "next/image";

const skillLogos = [
  // AI-related
  { src: "ml.png", width: 110, height: 60, label: "Machine Learning" },
  { src: "llama.png", width: 70, height: 60, label: "Llama" },
  { src: "gpt.png", width: 70, height: 60, label: "GPT" },
  { src: "finetuning.png", width: 90, height: 60, label: "Finetuning" },
  { src: "prompt.png", width: 60, height: 60, label: "Prompt Engineering" },
  { src: "n8n.png", width: 100, height: 60, label: "n8n Automation" },
  { src: "python.png", width: 60, height: 60, label: "Python" },
  // Software (languages, frameworks, tools)
  { src: "js.png", width: 40, height: 60, label: "JavaScript" },
  { src: "ts.png", width: 40, height: 60, label: "TypeScript" },
  { src: "react.png", width: 60, height: 60, label: "React" },
  { src: "node.png", width: 70, height: 60, label: "Node.js" },
  { src: "next.png", width: 80, height: 60, label: "Next.js" },
  { src: "java.png", width: 70, height: 60, label: "Java" },
  { src: "laravel.png", width: 100, height: 60, label: "Laravel" },
  { src: "sql.png", width: 80, height: 60, label: "SQL" },
  { src: "mongo.png", width: 120, height: 60, label: "MongoDB" },
  { src: "docker.png", width: 70, height: 60, label: "Docker" },
];


const Skills = () => {
  // Memoize rows for desktop
  const rows = useMemo(() => {
    const total = skillLogos.length;
    const numRows = 2;
    const base = Math.floor(total / numRows);
    const extra = total % numRows;
    const result = [];
    let idx = 0;
    for (let i = 0; i < numRows; i++) {
      const count = base + (i < extra ? 1 : 0);
      result.push(skillLogos.slice(idx, idx + count));
      idx += count;
    }
    return result;
  }, []);

  return (
    <section
      className="py-16 md:py-0 md:pt-16 md:pb-8"
      style={{ background: "rgb(245,245,245)", width: "100vw", position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw" }}
      aria-labelledby="skills-heading"
    >
      <h2 id="skills-heading" className="sr-only">Skills</h2>
      {/* Desktop/Tablet: Grid layout, no animation */}
      <div className="hidden lg:flex flex-col items-center w-full px-4 md:px-12 lg:px-32">
        {rows.map((row, i) => (
          <div key={i} className="flex flex-row justify-center items-center gap-20 2xl:gap-20 lg:gap-12 mb-8">
            {row.map((logo, idx) => (
              <Image
                key={logo.src + idx}
                src={`/images/skills/new/1x/${logo.src}`}
                alt={logo.label}
                width={logo.width}
                height={logo.height}
                className="select-none opacity-90 brightness-98 hover:brightness-75 transition duration-500 ease-in-out"
                draggable={false}
                style={{ userSelect: 'none', width: logo.width, height: logo.height, objectFit: 'contain' }}
                loading="lazy"
              />
            ))}
          </div>
        ))}
      </div>
      {/* Mobile/Tablet: Animated slider (md and down) */}
      <div className="lg:hidden overflow-hidden w-full relative" style={{ width: "100vw" }}>
        <div
          className="flex items-center gap-12 lg:gap-20 animate-skills-slider"
          style={{
            width: "max-content",
            animation: "skillsSlider 30s linear infinite",
          }}
          aria-label="Skills logos slider"
        >
          {skillLogos.concat(skillLogos).map((logo, idx) => (
            <Image
              key={idx}
              src={`/images/skills/new/1x/${logo.src}`}
              alt={logo.label}
              width={logo.width}
              height={logo.height}
              className="select-none pointer-events-none opacity-90"
              draggable={false}
              style={{ userSelect: "none", width: logo.width, height: logo.height, objectFit: "contain" }}
              loading="lazy"
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

export default React.memo(Skills);
