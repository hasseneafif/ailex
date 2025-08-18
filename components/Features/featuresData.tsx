import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
           <svg width="40" height="40" viewBox="0 0 44.8 27.86" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon fill="#000" points="44.8 1.03 22.92 27.86 0 0 22.77 11.65 44.8 1.03"/>
      </svg>
   
    ),
    title: "Who am i?",
    paragraph:
      "Hassene, a Full-Stack Software/AI Engineer with a passion for designing and innovating solutions",
  },
  {
    id: 2,
    icon: (
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="black" d="M24 23h2v8h-2zm4-2h2v10h-2zm-8 6h2v4h-2zm-2-7v-2h1v-7h-1V9h4v2h-1v7h1v2zm-3.5 0h2L13 9h-3L6.503 20h2l.601-2h4.778zm-4.794-4l1.628-5.411l.256-.003L13.264 16z"/>
        <path fill="black" d="M17 30H0V0h30v17h-2V2H2v26h15z"/>
      </svg>
    ),
    title: "Two titles",
    paragraph:
      "With over 3 years of intense experience, i have mastered the art of software development, all while honing my skills in AI and machine learning.",
  },
  {
    id: 3,
    icon: (
      <svg width="40" height="40" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="black" fillRule="evenodd" d="m256 34.347l192 110.851v221.703L256 477.752L64 366.901V145.198zM106.666 192.001v150.266l128 73.9V265.902zm298.667.001l-128 73.9v150.265l128-73.9zM256 83.614l-125.867 72.67L256 228.952l125.867-72.67z"/>
      </svg>
    ),
    title: "A to Z Versatility",
    paragraph:
      "My versatile profile allowed me to have a product oriented mindset, delivering full projects from design, to ai to engineering",
  },

];

export default featuresData;
