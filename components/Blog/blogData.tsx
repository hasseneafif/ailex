import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Bourse de Tunis : stabilité du Tunindex et rapport ESG en 2024",
    paragraph:
      "Le Tunindex reste stable à 11 663 points (–0,04 %), la Bourse publie son premier rapport ESG – un tournant vers la durabilité.",
    image: "/images/blog/news-tunisie.jpg",
    author: {
      name: "Réseau Financier",
      image: "/images/blog/reseau-financier.webp",
      designation: "Analyste Économique",
    },
    tags: ["Tunisie", "Bourse"],
    publishDate: "08/07/2025",
  },
  {
    id: 2,
    title: "Wall Street en hausse : Fed encourage, Nvidia franchit les 4 000 Md $",
    paragraph:
      "Les minutes de la Fed ravivent l’optimisme, Nvidia atteint 4 000 milliards $ de capitalisation, Merck acquiert Verona Pharma pour 10 milliards $.",
    image: "/images/blog/news-usa.jpg",
    author: {
      name: "Réseau Financier US",
      image: "/images/blog/reseau-financier.webp",
      designation: "Analyste US",
    },
    tags: ["USA", "Tech"],
    publishDate: "09/07/2025",
  },
  {
    id: 3,
    title: "Commerce mondial : métaux stratégiques et tarifs commerciaux",
    paragraph:
      "La Chine limite l’export de métaux stratégiques en riposte aux tarifs US, alors que l’UE et les USA négocient des droits de douane impactant les industries.",
    image: "/images/blog/news-world.jpg",
    author: {
      name: "Réseau Finance Monde",
      image: "/images/blog/reseau-financier.webp",
      designation: "Analyste International",
    },
    tags: ["International", "Commerce"],
    publishDate: "05/05/2025",
  },
];

export default blogData;
