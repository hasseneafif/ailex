"use client";
import React, { use, useState, useEffect } from "react";
import {
  ChevronRight,
  Folder,
  FolderOpen,
  File,

  TrendingUp,
  Calendar,
  Sparkles,
  ExternalLink,
  X,
  Minus, Square,
  Bot,
} from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import projectData from "../Blog/projectData";
import { useTranslations } from "next-intl";
// import { stopLenisScroll, startLenisScroll } from "@/components/Common/smoothscroll";

// Smooth teal border flicker animation
const borderFlickerStyle = `
@keyframes border-flicker {
  0%, 100% { border-color: rgba(20, 184, 166, 0.4); }
  50% { border-color: rgba(20, 184, 166, 1); }
}
.animate-border-flicker {
  animation: border-flicker 1.2s infinite;
}
`;
if (typeof document !== "undefined" && !document.getElementById("border-flicker-style")) {
  const style = document.createElement("style");
  style.id = "border-flicker-style";
  style.innerHTML = borderFlickerStyle;
  document.head.appendChild(style);
}

const mockFiles = [
  {
    name: "src",
    type: "directory",
    path: "/src",
    children: [
      { name: "about-me.js", type: "file", path: "/src/about-me.js" },
      { name: "projects.html", type: "file", path: "/src/projects.html" },
      { name: "index.js", type: "file", path: "/src/index.js" },
    ],
  },
  { name: "README.md", type: "file", path: "/README.md" },
];

const StaticFileTree = ({ data, onSelect, selectedFile, clickedAbout }) => {
  if (!data || data.length === 0) return null;

  return (
    <ul className="space-y-1">
      {data.map((item) => (
        <li key={item.path}>
          {item.type === "directory" ? (
            <div>
              <div className="flex items-center space-x-3 w-full text-left p-2 rounded-lg hover:bg-[rgba(177,177,177,0.01)] transition-all duration-200 group cursor-pointer">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <FolderOpen className="w-4 h-4 text-teal-400" />
                <span className="text-gray-200 group-hover:text-white transition-colors">
                  {item.name}
                </span>
              </div>
              <div className="ml-6 mt-1">
                <StaticFileTree
                  data={item.children || []}
                  onSelect={onSelect}
                  selectedFile={selectedFile}
                  clickedAbout={clickedAbout}
                />
              </div>
            </div>
          ) : (
            <div
              onClick={() => onSelect(item)}
              className={`flex items-center space-x-3 w-full text-left p-2 rounded-lg transition-all duration-200 group cursor-pointer border ${
                selectedFile.path === item.path
                  ? "bg-gradient-to-r from-teal-500/20 to-purple-500/20 border-teal-400/30"
                  : "hover:bg-[rgba(177,177,177,0.01)] border-transparent"
              } ${!clickedAbout && item.name === "about-me.js" ? "animate-border-flicker" : ""}`}
            >
              <File className="w-4 h-4 text-purple-400" />
              <span className="text-gray-300 group-hover:text-white transition-colors text-sm">
                {item.name}
              </span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

const ProjectsView = () => {
  const [isDesktop, setIsDesktop] = useState(false);

useEffect(() => {
  const checkIsDesktop = () => {
    const isDesktopDevice = window.matchMedia('(min-width: 1024px)').matches && 
                           !('ontouchstart' in window || navigator.maxTouchPoints > 0);
    setIsDesktop(isDesktopDevice);
  };

  checkIsDesktop();
  window.addEventListener('resize', checkIsDesktop);
  
  return () => window.removeEventListener('resize', checkIsDesktop);
}, []);
  const tProjects = useTranslations("projects");
  const projectDataa = projectData(tProjects);
  return (
    <div id="projects" className="flex flex-col h-full w-full">
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-4 sm:p-6 w-full">
        {projectDataa.map((p) => (
          <div
            key={p.id}
            className="bg-[rgb(7,8,8)] rounded-2xl p-4 shadow-lg flex flex-col gap-2 text-gray-100"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-base">{p.title}</h3>
       {p.link ? (
  <a href={p.link} target="_blank" rel="noreferrer">
  <ExternalLink className="w-4 h-4 text-teal-400 animate-pulse-glow" />
  </a>
) : (
  <div className="w-4 h-4"> </div>
)}

            </div> 
            <div className="flex gap-2 text-xs mt-1 font-bold  flex-wrap">
              <span className="inline-flex items-center gap-1 bg-white text-black px-2 py-1 rounded-full">
               {p.tags[0]}
              </span>
              <span className="inline-flex items-center gap-1 bg-white text-black px-2 py-1 rounded-full">
                 {p.tags[1]}
              </span>
            </div>
            <div className="mt-2 bg-black/40 rounded-xl p-2 border border-gray-700 relative">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-[0.70rem]">{p.paragraph}</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
                <Bot className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile carousel */}
      <div className="md:hidden p-4 py-8">
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={6000}
          swipeable
          emulateTouch
          stopOnHover={false}
        >
          {projectDataa.map((p) => (
            <div key={p.id} className="px-2">
              <div className="bg-[rgb(7,8,8)] rounded-2xl p-4 shadow-lg flex flex-col gap-2 text-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm">{p.title}</h3>
                 {p.link ? (
  <a href={p.link} target="_blank" rel="noreferrer">
  <ExternalLink className="w-4 h-4 text-teal-400 animate-pulse-glow" />
  </a>
) : (
  <div className="w-4 h-4"> </div>
)}
                </div>
                <div className="flex gap-2 text-xs mt-1 flex-wrap">
                  <span className="inline-flex items-center gap-1 bg-white text-black px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3" /> {p.tags[0]}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white text-black px-2 py-1 rounded-full">
                    <Calendar className="w-3 h-3" /> {p.tags[1]}
                  </span>
                </div>
                <div className="mt-2 bg-black/40 rounded-xl p-2 border border-gray-700 relative">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-xs">{p.paragraph}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

const StaticIDEHero = () => {
  const [selectedFile, setSelectedFile] = useState({
    name: "projects.html",
    path: "/src/projects.html",
  });

  const [clickedAbout, setClickedAbout] = useState(false);

  const handleSelect = (file) => {
    if (file.name === "about-me.js") {
      setClickedAbout(true); // stop flicker after clicking
    }
    setSelectedFile(file);
  };
  const renderContent = () => {
    if (selectedFile.name === "projects.html") return <ProjectsView />;
    if (selectedFile.name === "about-me.js")
      return (
<pre className="bg-black/20 h-full text-gray-100 p-6 text-sm font-mono leading-relaxed overflow-auto">
  <code>{`function AboutMe() {

return "Hey there! I'm an AI Software Engineer with 3 years of experience
in full-stack and AI development. 

I'm passionate about AI and Data, with
a proven track record of delivering optimized, innovative solutions across
multiple projects. 

With my intense full-stack experience, i can take an AI project from idea to a deployed,
performance/design focused product.";

}
export default AboutMe;`}</code>
</pre>

      );
       if (selectedFile.name === "index.js")
      return (
<pre className="bg-black/20 h-full text-gray-100 p-6 text-sm font-mono leading-relaxed overflow-auto">
  <code>{`function NoIdea() {

return "No idea what to put here.";

}
export default NoIdea;`}</code>
</pre>

      );

            if (selectedFile.name === "README.md")
      return (
<pre className="bg-black/20 h-full text-gray-100 p-6 text-sm font-mono leading-relaxed overflow-auto">
  <code>{`function StillNoIdea() {

return "Also no idea what to put here either.";

}
export default StillNoIdea;`}</code>
</pre>

      );
      
    return (
      <pre className="bg-black/20 h-full text-gray-100 p-6 text-sm font-mono leading-relaxed overflow-auto">
        <code>{selectedFile.name} content placeholder</code>
      </pre>
    );
  };
  const [isDesktop, setIsDesktop] = useState(false);

useEffect(() => {
  const checkIsDesktop = () => {
    const isDesktopDevice = window.matchMedia('(min-width: 1024px)').matches && 
                           !('ontouchstart' in window || navigator.maxTouchPoints > 0);
    setIsDesktop(isDesktopDevice);
  };

  checkIsDesktop();
  window.addEventListener('resize', checkIsDesktop);
  
  return () => window.removeEventListener('resize', checkIsDesktop);
}, []);
  return (
    <div className="relative overflow-hidden w-full">
      {/* Fluid container for responsive layout */}
      <div className="max-w-[1200px] lg:w-[900px] xl:w-[1000px]  px-4 sm:px-6 md:px-8 py-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* File Explorer (desktop only) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-[rgba(177,177,177,0.01)] backdrop-blur-xl border border-white/10 rounded-2xl p-4 h-[70vh]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                <Folder className="w-5 h-5 text-teal-400" />
                <h3 className="font-semibold text-gray-200">Explorer</h3>
              </div>
              <div className="overflow-y-auto h-[calc(100%-4rem)] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <StaticFileTree
                  data={mockFiles}
                  onSelect={handleSelect}
                  selectedFile={selectedFile}
                  clickedAbout={clickedAbout}
                />
              </div>
            </div>
          </div>

          {/* Code Viewer */}
          <div 
  
  id="codeviewer" className="lg:col-span-3">
            <div className="bg-[rgba(177,177,177,0.01)] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col w-full h-[310px] md:h-[70vh]">
              {/* Top Bar */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[rgba(177,177,177,0.01)] flex-shrink-0">
                {/* Mobile tabs */}
                <div className="flex gap-2 overflow-x-auto lg:hidden">
                  {mockFiles.flatMap((item) =>
                    item.type === "directory"
                      ? item.children.map((child) => (
                          <button
                            key={child.path}
                            onClick={() => handleSelect(child)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-all border ${
                              selectedFile.path === child.path
                                ? "bg-gradient-to-r from-teal-500/20 to-purple-500/20 border-teal-400/30 text-white"
                                : "bg-white/10 text-gray-300 hover:bg-white/20 border-transparent"
                            } ${!clickedAbout && child.name === "about-me.js" ? "animate-border-flicker" : ""}`}
                          >
                            <File className="w-4 h-4 text-purple-400" />
                            {child.name}
                          </button>
                        ))
                      : [
                          <button
                            key={item.path}
                            onClick={() => handleSelect(item)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-all ${
                              selectedFile.path === item.path
                                ? "bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-400/30 text-white"
                                : "bg-white/10 text-gray-300 hover:bg-white/20"
                            }`}
                          >
                            <File className="w-4 h-4 text-purple-400" />
                            {item.name}
                          </button>,
                        ]
                  )}
                </div>

                {/* Desktop file info */}
                <div className="hidden lg:flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <File className="w-4 h-4 text-purple-400" />
                    <span className="font-medium text-white">{selectedFile.name}</span>
                    <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                      {selectedFile.path}
                    </span>
                  </div>
                <div className="flex items-center gap-2">

  <div className="p-1 hover:bg-white/10 rounded-full cursor-pointer">
    <Minus className="w-3 h-3 text-gray-400 hover:text-yellow-500" />
  </div>
  <div className="p-1 hover:bg-white/10 rounded-full cursor-pointer">
    <Square className="w-3 h-3 text-gray-400 hover:text-green-600" />
  </div>
    <div className="p-1 hover:bg-white/10 rounded-full cursor-pointer">
    <X className="w-3 h-3 text-gray-400 hover:text-red-600" />
  </div>
</div>

                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto w-full">{renderContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticIDEHero;
