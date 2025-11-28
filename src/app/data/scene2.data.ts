import { SceneItemData } from "@/app/components/scene/SceneLayer";

export const SCENE_2_ITEMS: SceneItemData[] = [
  // 1 Table
  { id: "table", src: "/assets/Scene/Scene1/table.webp", alt: "Desk table", style: { left: "1.15%", top: "73.07%", width: "47.71%", height: "78.54%" },  },

  // Posters (order preserved)
  { id: "poster11", src: "/assets/Scene/Scene1/poster11.webp", alt: "Wall poster", style: { left: "39.17%", top: "-108.33%", width: "6.1%", height: "16.66%" },  },
  { id: "poster9", src: "/assets/Scene/Scene1/poster9.webp", alt: "Wall poster", style: { left: "38.78%", top: "-62.86%", width: "8.49%", height: "29.04%" },  },
  { id: "poster10", src: "/assets/Scene/Scene1/poster10.webp", alt: "Wall poster", style: { left: "3.52%", top: "-102.54%", width: "7.25%", height: "25.23%" },  },
  { id: "poster12", src: "/assets/Scene/Scene1/poster12.webp", alt: "Wall poster", style: { left: "25.31%", top: "-79.54%", width: "7.25%", height: "25.23%" },  },
  { id: "poster13", src: "/assets/Scene/Scene1/poster13.webp", alt: "Wall poster", style: { left: "13.24%", top: "-63.14%", width: "7.25%", height: "25.23%" },  },
  { id: "poster15", src: "/assets/Scene/Scene1/poster15.webp", alt: "Wall poster", style: { left: "5.65%", top: "-40.03%", width: "8.57%", height: "29.04%" },  },
  { id: "poster14", src: "/assets/Scene/Scene1/poster14.webp", alt: "Wall poster", style: { left: "24.01%", top: "-23.2%", width: "11.64%", height: "29.04%" },  },

  // Posters continued
  { id: "poster8", src: "/assets/Scene/Scene1/poster8.webp", alt: "Wall poster", style: { left: "52.71%", top: "18.07%", width: "6.41%", height: "17.63%" },  },
  { id: "poster7", src: "/assets/Scene/Scene1/poster7.webp", alt: "Wall poster", style: { left: "46.18%", top: "44.42%", width: "5.48%", height: "20.15%" },  },
  { id: "poster6", src: "/assets/Scene/Scene1/poster6.webp", alt: "Wall poster", style: { left: "2.07%", top: "7.57%", width: "10.45%", height: "27.07%" },  },
  { id: "poster5", src: "/assets/Scene/Scene1/poster5.webp", alt: "Wall poster", style: { left: "-0.76%", top: "28.56%", width: "5.46%", height: "20.92%" },  },
  { id: "poster4", src: "/assets/Scene/Scene1/poster4.webp", alt: "Wall poster", style: { left: "39.17%", top: "8.55%", width: "7.8%", height: "29.64%" },  },
  { id: "poster3", src: "/assets/Scene/Scene1/poster3.webp", alt: "Wall poster", style: { left: "45.68%", top: "21.04%", width: "3.4%", height: "15.37%" },  },
  { id: "poster2", src: "/assets/Scene/Scene1/poster2.webp", alt: "Wall poster", style: { left: "6.58%", top: "40.8%", width: "4.93%", height: "12.45%" },  },
  { id: "poster1", src: "/assets/Scene/Scene1/poster1.webp", alt: "Wall poster", style: { left: "39.66%", top: "48.5%", width: "4.19%", height: "8.27%" },  },

  // Computer
  { id: "computer", src: "/assets/Scene/Scene1/Computer.webp", alt: "Computer workstation", style: { left: "12.53%", top: "14.28%", width: "24.94%", height: "70.28%" },  priority: true },

  // Papers
  { id: "paper3", src: "/assets/Scene/Scene1/paper3.webp", alt: "Paper document", style: { left: "42.4%", top: "77.25%", width: "6.9%", height: "9.51%" },  },
  { id: "paper2", src: "/assets/Scene/Scene1/paper2.webp", alt: "Paper document", style: { left: "1.61%", top: "77.81%", width: "5.7%", height: "8.79%" },  },
  { id: "paper1", src: "/assets/Scene/Scene1/paper1.webp", alt: "Paper document", style: { left: "1.52%", top: "82.28%", width: "7.14%", height: "9.51%" },  },

  // Lamp and books
  { id: "lamp", src: "/assets/Scene/Scene1/lamp.webp", alt: "Desk lamp", style: { left: "2.96%", top: "12.05%", width: "12.46%", height: "67.85%" },  },
  { id: "book1", src: "/assets/Scene/Scene1/book1.webp", alt: "Book", style: { left: "8.99%", top: "77.93%", width: "5.37%", height: "11.49%" },  },
  { id: "book2", src: "/assets/Scene/Scene1/book2.webp", alt: "Book", style: { left: "37.3%", top: "69.98%", width: "6.17%", height: "13.41%" },  },

  // Pen, light, pencil box, postit, paper4
  { id: "pen", src: "/assets/Scene/Scene1/pen.webp", alt: "Pen", style: { left: "38.85%", top: "86.26%", width: "3.2%", height: "2.02%" },  },
  { id: "light", src: "/assets/Scene/Scene1/light.webp", alt: "", style: { left: "11.92%", top: "23.18%", width: "25.5%", height: "59.89%" },  className: "mix-blend-screen" },
  { id: "pencilBox", src: "/assets/Scene/Scene1/pencil box.webp", alt: "Pencil box", style: { left: "43.37%", top: "67.67%", width: "2.69%", height: "15.37%" },  },
  { id: "postit", src: "/assets/Scene/Scene1/postit.webp", alt: "Post-it note", style: { left: "43.84%", top: "85.06%", width: "2.61%", height: "4.24%" },  },
  { id: "paper4", src: "/assets/Scene/Scene1/paper4.webp", alt: "Paper document", style: { left: "10.65%", top: "68.42%", width: "2.28%", height: "8.03%" },  },

  // Decorative / window / buildings (these appear after the human in original code)
  { id: "lightWindow", src: "/assets/Scene/Scene1/light window.webp", alt: "Window light glow", style: { left: "67.31%", top: "19.3%", width: "14.89%", height: "62.68%" },  animGroup: 2 },
  { id: "star", src: "/assets/Scene/Scene1/star.webp", alt: "Stars decoration", style: { left: "73.03%", top: "33.93%", width: "8.32%", height: "7.37%" },  animGroup: 4 },
  { id: "circle", src: "/assets/Scene/Scene1/circle.webp", alt: "Decorative circles", style: { left: "67.12%", top: "21.62%", width: "14.34%", height: "24.88%" },  animGroup: 5 },
  { id: "building2", src: "/assets/Scene/Scene1/building2.webp", alt: "Building exterior", style: { left: "67.31%", top: "37.61%", width: "14.89%", height: "44.37%" },  animGroup: 4 },
  { id: "building1", src: "/assets/Scene/Scene1/building1.webp", alt: "Building exterior", style: { left: "67.31%", top: "48.01%", width: "14.89%", height: "33.97%" },  animGroup: 5 },
  { id: "window", src: "/assets/Scene/Scene1/window.webp", alt: "Window frame", style: { left: "60.95%", top: "6.22%", width: "28.1%", height: "79.63%" },  animGroup: 1 },
  { id: "curtain2", src: "/assets/Scene/Scene1/curtain2.webp", alt: "Window curtain", style: { left: "81.49%", top: "8%", width: "4.87%", height: "86.95%" },  animGroup: 3 },
  { id: "curtain1", src: "/assets/Scene/Scene1/curtain1.webp", alt: "Window curtain", style: { left: "63.3%", top: "7.96%", width: "4.87%", height: "86.95%" },  animGroup: 3 },
  // Moon & Human are Lottie — kept as children in the page
];

export default SCENE_2_ITEMS;
