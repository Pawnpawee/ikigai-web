import type { IkigaiAnalysis } from "./ikigai.data";

// ─────────────────────────────────────────────────────────────
//? Modal Config สำหรับแสดงรายละเอียดแต่ละด้าน Ikigai
//? Reference: Figma node 930:8328 (s12-modal) 1920x1080
//? Modal frame: x=284, y=222, w=1278.23, h=652.36
// ─────────────────────────────────────────────────────────────

interface IkigaiModalConfig {
  key: keyof IkigaiAnalysis;
  title: string;
  iconSrc: string;
  //? สีพื้นหลังของ Modal (gradient)
  bgGradient: string;
  //? สีพื้นหลัง Header
  headerBg: string;
  //? สีพื้นหลัง Content
  contentBg: string;
  //? สีหลักของ Header text
  titleColor: string;
  //? Labels สำหรับ Section ย่อย
  overallLabel: string;
  strengthLabel: string;
  developLabel: string;
  //? Icon Sources สำหรับ Section ย่อย
  overallIcon: string;
  strengthIcon: string;
  developIcon: string;
}

const IKIGAI_MODAL_CONFIGS: IkigaiModalConfig[] = [
  {
    key: "what_you_love",
    title: "What you love",
    iconSrc: "/assets/icons/love.webp",
    bgGradient:
      "linear-gradient(0deg, #601126 3.98%, #6A1429 16.02%, #841D31 37.33%, #B02C3E 65.12%, #EC4151 96.62%)",
    headerBg: "",
    contentBg: "rgba(0, 0, 0, 0.20)",
    titleColor: "#FFFFFF",
    overallLabel: "สรุปภาพรวม",
    strengthLabel: "จุดแข็ง",
    developLabel: "จุดพัฒนา",
    overallIcon: "/assets/icons/icon_overall.webp",
    strengthIcon: "/assets/icons/icon_strength.webp",
    developIcon: "/assets/icons/icon_develop.webp"
  },
  {
    key: "what_you_good_at",
    title: "What you are good at",
    iconSrc: "/assets/icons/skill.webp",
    bgGradient:
      "linear-gradient(0deg, #2E0A92 3.98%, #360D9B 18.8%, #4E17B6 44.74%, #7527E2 78.09%, #8D31FD 96.62%)",
    headerBg: "",
    contentBg: "rgba(0, 0, 0, 0.20)",
    titleColor: "#FFFFFF",
    overallLabel: "สรุปภาพรวม",
    strengthLabel: "จุดแข็ง",
    developLabel: "จุดพัฒนา",
    overallIcon: "/assets/icons/icon_overall.webp",
    strengthIcon: "/assets/icons/icon_strength.webp",
    developIcon: "/assets/icons/icon_develop.webp"
  },
  {
    key: "what_the_world_need",
    title: "What the world needs",
    iconSrc: "/assets/icons/world.webp",
    bgGradient:
      "linear-gradient(0deg, #095346 3.98%, #135A45 15.09%, #2D7042 34.55%, #59933E 59.56%, #95C238 88.28%, #A8D137 96.62%)",
    headerBg: "",
    contentBg: "rgba(0, 0, 0, 0.20)",
    titleColor: "#FFFFFF",
    overallLabel: "สรุปภาพรวม",
    strengthLabel: "จุดแข็ง",
    developLabel: "จุดพัฒนา",
    overallIcon: "/assets/icons/icon_overall.webp",
    strengthIcon: "/assets/icons/icon_strength.webp",
    developIcon: "/assets/icons/icon_develop.webp"
  },
  {
    key: "what_you_can_be_paid_for",
    title: "What you can be paid for",
    iconSrc: "/assets/icons/paid.webp",
    bgGradient:
      "linear-gradient(0deg, #8D380D 3.98%, #96410D 20.65%, #B1590E 48.44%, #DD8011 84.57%, #EE9012 96.62%)",
    headerBg: "",
    contentBg: "rgba(0, 0, 0, 0.20)",
    titleColor: "#FFFFFF",
    overallLabel: "สรุปภาพรวม",
    strengthLabel: "จุดแข็ง",
    developLabel: "จุดพัฒนา",
    overallIcon: "/assets/icons/icon_overall.webp",
    strengthIcon: "/assets/icons/icon_strength.webp",
    developIcon: "/assets/icons/icon_develop.webp"
  },
  {
    key: "passion",
    title: "Passion",
    iconSrc: "/assets/icons/passion.webp",
    bgGradient:
      "linear-gradient(180deg, rgba(255,100,180,0.9) 0%, rgba(180,40,120,0.95) 100%)",
    headerBg: "",
    contentBg: "rgba(0, 0, 0, 0.20)",
    titleColor: "#FFFFFF",
    overallLabel: "สรุปภาพรวม",
    strengthLabel: "จุดแข็ง",
    developLabel: "จุดพัฒนา",
    overallIcon: "/assets/icons/icon_overall.webp",
    strengthIcon: "/assets/icons/icon_strength.webp",
    developIcon: "/assets/icons/icon_develop.webp"
  },
  {
    key: "mission",
    title: "Mission",
    iconSrc: "/assets/icons/mission.webp",
    bgGradient:
      "linear-gradient(180deg, rgba(140,200,60,0.9) 0%, rgba(80,130,20,0.95) 100%)",
    headerBg: "",
    contentBg: "rgba(0, 0, 0, 0.20)",
    titleColor: "#FFFFFF",
    overallLabel: "สรุปภาพรวม",
    strengthLabel: "จุดแข็ง",
    developLabel: "จุดพัฒนา",
    overallIcon: "/assets/icons/icon_overall.webp",
    strengthIcon: "/assets/icons/icon_strength.webp",
    developIcon: "/assets/icons/icon_develop.webp"
  },
  {
    key: "profession",
    title: "Profession",
    iconSrc: "/assets/icons/profession.webp",
    bgGradient:
      "linear-gradient(180deg, rgba(150,100,220,0.9) 0%, rgba(80,40,160,0.95) 100%)",
    headerBg: "rgba(150, 100, 220, 0.7)",
    contentBg: "",
    titleColor: "#FFFFFF",
    overallLabel: "สรุปภาพรวม",
    strengthLabel: "จุดแข็ง",
    developLabel: "จุดพัฒนา",
    overallIcon: "/assets/icons/icon_overall.webp",
    strengthIcon: "/assets/icons/icon_strength.webp",
    developIcon: "/assets/icons/icon_develop.webp"
  },
  {
    key: "vocation",
    title: "Vocation",
    iconSrc: "/assets/icons/vocation.webp",
    bgGradient:
      "linear-gradient(180deg, rgba(255,160,40,0.9) 0%, rgba(180,100,10,0.95) 100%)",
    headerBg: "",
    contentBg: "rgba(0, 0, 0, 0.20)",
    titleColor: "#FFFFFF",
    overallLabel: "สรุปภาพรวม",
    strengthLabel: "จุดแข็ง",
    developLabel: "จุดพัฒนา",
    overallIcon: "/assets/icons/icon_overall.webp",
    strengthIcon: "/assets/icons/icon_strength.webp",
    developIcon: "/assets/icons/icon_develop.webp"
  },
];

//? Helper: หา Modal Config จาก key
export const getModalConfig = (key: keyof IkigaiAnalysis) =>
  IKIGAI_MODAL_CONFIGS.find((c) => c.key === key);
