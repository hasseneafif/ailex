
"use client"
import projectData from "./projectData";
import React, { useState, useMemo } from "react";
import Image from "next/image";


const ProjectList = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const projects = useMemo(() => projectData, []);
  return (
    <section
      id="projects"
      className="py-16 md:py-20 lg:py-28 bg-white"
      aria-labelledby="projects-heading"
    >
      <h2 id="projects-heading" className="sr-only">Projects</h2>
      <div className="container">
        <div className="relative w-full">
          <span
            className={`hidden lg:inline font-xoireqe projects-title-size text-white font-bold absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-30 whitespace-nowrap transition-opacity duration-300 ${hovered !== null ? 'opacity-90' : 'opacity-60'}`}
            style={{
              lineHeight: 1,
              letterSpacing: '0.1em',
              userSelect: 'none',
            }}
            aria-hidden="true"
          >
            PROJECTS
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className="holographic-card bg-black shadow-lg p-8 py-12 flex flex-col items-start relative overflow-hidden transition-all duration-500 ease-[ease] h-full"
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                tabIndex={0}
                aria-labelledby={`project-title-${project.id}`}
                role="article"
              >
                <span className="holographic-card-before pointer-events-none select-none" aria-hidden="true"></span>
                <div className="flex flex-col items-start mb-4 w-full z-10">
                  <Image
                    src={project.image}
                    alt={project.title + ' project preview'}
                    width={(project.width || 112) * 0.8}
                    height={(project.height || 112) * 0.8}
                    className="object-contain rounded mb-6"
                    loading="lazy"
                      draggable={false}

                  />
                  <span id={`project-title-${project.id}`} className="font-xoireqe text-left text-[0.85rem] md:text-[1rem] text-white font-light w-full">
                    {project.title}
                  </span>
                </div>
                <p className="text-white text-left font-ubunto mb-4 z-10">{project.paragraph}</p>
                <div className="flex flex-wrap gap-2 mt-auto z-10">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold border border-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default React.memo(ProjectList);
