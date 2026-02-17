export interface IkigaiSection {
  short_summary?: string;
  overall_summary: string;
  strengths: string[];
  development_points: string[];
}

export interface IkigaiAnalysis {
  what_you_love: IkigaiSection;
  what_you_good_at: IkigaiSection;
  what_the_world_need: IkigaiSection;
  what_you_can_be_paid_for: IkigaiSection;
  passion: IkigaiSection;
  mission: IkigaiSection;
  profession: IkigaiSection;
  vocation: IkigaiSection;
}

export interface IkigaiResult {
  ikigai_analysis: IkigaiAnalysis;
}

//? Display configuration for each section
export interface IkigaiSectionConfig {
  key: keyof IkigaiAnalysis;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
}

export const IKIGAI_SECTIONS: IkigaiSectionConfig[] = [
  {
    key: "what_you_love",
    title: "What You Love",
    subtitle: "สิ่งที่คุณรัก",
    color: "#FF6B9D",
    icon: "❤️",
  },
  {
    key: "what_you_good_at",
    title: "What You're Good At",
    subtitle: "สิ่งที่คุณถนัด",
    color: "#FFA06B",
    icon: "⭐",
  },
  {
    key: "what_the_world_need",
    title: "What The World Needs",
    subtitle: "สิ่งที่โลกต้องการ",
    color: "#6BCF7F",
    icon: "🌍",
  },
  {
    key: "what_you_can_be_paid_for",
    title: "What You Can Be Paid For",
    subtitle: "สิ่งที่สร้างรายได้",
    color: "#6BA3FF",
    icon: "💰",
  },
  {
    key: "passion",
    title: "Passion",
    subtitle: "ความหลงใหล",
    color: "#FF8EC7",
    icon: "💖",
  },
  {
    key: "mission",
    title: "Mission",
    subtitle: "พันธกิจ",
    color: "#8EC7FF",
    icon: "🎯",
  },
  {
    key: "profession",
    title: "Profession",
    subtitle: "อาชีพ",
    color: "#8EFFB3",
    icon: "💼",
  },
  {
    key: "vocation",
    title: "Vocation",
    subtitle: "อาชีพเพื่อสังคม",
    color: "#FFD68E",
    icon: "✨",
  },
];
