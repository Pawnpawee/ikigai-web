import { getImgPath } from "@/utils/cloudinaryUtils";
import type { SceneItemData } from "../components/reusable/SceneLayer";

//? Scene 9.2 Data: Job Cards Selection (Carousel)
//? Layout: Desktop 1920x1080, Mobile 1080x1920
//? Animation Groups:
//?  1 = element_bg  (0 → 0.1)  — background texture
//?  2 = bgelement   (mobile only, decorative ground)

// ────────────────────────────────────────────────────
//  Background SceneLayer Items
// ────────────────────────────────────────────────────

export const SCENE_S9_2_ITEMS: SceneItemData[] = [
  {
    id: "element_bg",
    src: getImgPath("Scene/Scene9/02/element_bg.webp"),
    mobileSrc: getImgPath("Scene/Scene9/02/element_bg_mb.webp"),
    alt: "Background texture",
    //? Desktop: 1920/1920 = 100%, 1080/1080 = 100% (full cover)
    style: {
      width: "100%",
      height: "100%",
      left: "0%",
      top: "0%",
    },
    //? Mobile: 1076.82/1080 = 99.72%, 1923.85/1920 = 100.20%
    mobileStyle: {
      width: "100%",
      height: "100%",
      left: "0%",
      top: "0%",
    },
    animGroup: 1,
  },
];

// ────────────────────────────────────────────────────
//  Job Card Data (Carousel)
// ────────────────────────────────────────────────────

interface JobCard {
  id: string;
  category: string;
  jobs: string[];
  avatarSrc: string;
}

//? แต่ละ Card มี avatar illustration เฉพาะตัว
//? Avatar เก็บที่ Cloudinary: Scene/Scene9/02/avatar_{n}.webp
export const JOB_CARDS: JobCard[] = [
  {
    id: "jc-1",
    category: "สาขาอาชีพก่อสร้างและให้บริการ\nเกี่ยวกับอสังหาริมทรัพย์",
    jobs: [
      "ช่างเขียนแบบโครงสร้าง",
      "งานวิศวกรรมโยธา",
      "วิศวกรออกแบบโครงสร้างสามมิติ",
      "สถาปนิก/นักวางผังเมือง",
      "นักสำรวจพื้นดิน",
    ],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_1.webp"),
  },
  {
    id: "jc-2",
    category: "สาขาอาชีพการเกษตร\nและเทคโนโลยีชีวภาพ",
    jobs: [
      "นักเทคโนโลยีชีวภาพ",
      "เกษตรกรการเกษตร",
      "เกษตรกรฟาร์มสัตว์เลี้ยง",
      "นักฟื้นฟูพื้นที่สีเขียว",
    ],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_2.webp"),
  },
  {
    id: "jc-3",
    category: "สาขาอาชีพการบริหารจัดการ\nและการให้บริการทางวิชาชีพ",
    jobs: [
      "เลขานุการ",
      "นักวางแผนงานประชุม",
      "นักสังคมสงเคราะห์",
      "นักวิเคราะห์ระบบ",
      "งานด้านภาษา (ล่าม/ผู้แปล)",
      "นักเดิน/นักสนทนาเป็นเพื่อน",
      "นักแนะแนว",
    ],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_3.webp"),
  },
  {
    id: "jc-4",
    category:
      "สาขาอาชีพการผลิตเชื้อเพลิงชีวภาพ เคมีชีวภาพ ผลิตภัณฑ์เคมี และไบโอดีเซล",
    jobs: [
      "เจ้าหน้าที่เทคนิคด้านวิทยาศาสตร์ชีวภาพ",
      "นักเคมีทั่วไป",
      "ผู้ควบคุมเครื่องกลั่นและเตาปฏิกรณ์",
    ],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_4.webp"),
  },
  {
    id: "jc-5",
    category: "สาขาอาชีพ\nการพัฒนาบุคลากร",
    jobs: ["ผู้สอน", "นักแนะแนว", "HR เจ้าหน้าที่ฝ่ายบุคคล"],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_5.webp"),
  },
  {
    id: "jc-6",
    category: "สาขาอาชีพการพิมพ์\nและสื่อสารมวลชน",
    jobs: [
      "ผู้สร้างสรรค์งานด้าน VFX",
      "นักสร้างสรรค์บทความ Content creator",
      "บล็อกเกอร์/ยูทูบเบอร์/ติ๊กต็อกเกอร์",
      "นักกำกับและตัดต่อวิดีโอ",
    ],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_6.webp"),
  },
  {
    id: "jc-7",
    category: "สาขาอาชีพการวิจัย",
    jobs: [
      "ผู้สร้างอวัยวะจากสเตมเซลล์",
      "นักนิติวิทยาศาสตร์",
      "นักสเก็ตช์ภาพคนร้าย",
      "นักวิเคราะห์ด้านการวิจัยเชิงปฏิบัติการ",
      "นักวิจัยตลาด",
    ],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_7.webp"),
  },
  {
    id: "jc-8",
    category: "สาขาอาชีพเครื่องจักรกล\nและการผลิต",
    jobs: [
      "วิศวกรคุณภาพ",
      "ช่างซ่อมเครื่องจักรกล",
      "วิศวกรอุตสาหการ",
      "ผู้ควบคุมเครื่องจักรในการผลิต",
    ],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_8.webp"),
  },
  {
    id: "jc-9",
    category: "สาขาอาชีพด้านการแพทย์\nและสุขภาพ",
    jobs: [
      "แพทย์",
      "แพทย์เวชศาสตร์ฟื้นฟู",
      "นักทัศนมาตร",
      "นักบริบาล",
      "ที่ปรึกษาสุขภาพจิต",
      "นักกำหนดอาหาร",
      "ผู้ดูแลผู้ป่วย",
      "นักบำบัดโซเชียลมีเดีย",
      "พยาบาลวิชาชีพ",
      "สัตวแพทย์",
    ],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_9.webp"),
  },
  {
    id: "jc-10",
    category: "สาขาอาชีพท่องเที่ยว กีฬา\nและการจัดนิทรรศการ",
    jobs: [
      "พนักงานต้อนรับบนเครื่องบิน",
      "พนักงานโรงแรม",
      "นักกีฬาและผู้ฝึกสอน",
      "เกมเมอร์ esport",
      "งานสตาฟอีเวนต์",
    ],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_10.webp"),
  },
  {
    id: "jc-11",
    category: "สาขาอาชีพเทคโนโลยีดิจิทัล",
    jobs: [
      "นักการตลาด",
      "AI and Machine Learning Engineer",
      "Software Developer",
      "นักพัฒนา AR",
      "นักวิทยาศาสตร์ข้อมูล",
      "โปรแกรมเมอร์",
      "Cybersecurity",
      "Web Developer",
      "UX researcher",
    ],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_11.webp"),
  },
  {
    id: "jc-12",
    category: "สาขาอาชีพธุรกิจการเงิน\nและการจัดการทรัพย์สิน",
    jobs: [
      "นักคณิตศาสตร์ประกันภัย",
      "นักลงทุนคริปโทเคอร์เรนซี",
      "ผู้จัดการบัญชี",
      "ซีเอฟโอ",
      "นักตรวจสอบบัญชี",
      "เจ้าหน้าที่การเงิน",
      "เทรดเดอร์",
    ],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_12.webp"),
  },
  {
    id: "jc-13",
    category: "สาขาอาชีพธุรกิจบริการ\nและพาณิชย์",
    jobs: [
      "ตัวแทนบริการลูกค้า",
      "เจ้าของธุรกิจ Start-up",
      "ผู้อำนวยการฝ่ายสร้างสรรค์",
      "ร้านดูแลสัตว์เลี้ยง",
      "ไลฟ์ขายของ",
      "Influencer/นักแสดง",
    ],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_13.webp"),
  },
  {
    id: "jc-14",
    category: "สาขาอาชีพผลิตยานยนต์\nและชิ้นส่วน",
    jobs: ["ช่างปรับแต่งเครื่องยนต์", "วิศวกรยานยนต์", "วิศวกรเครื่องกล"],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_14.webp"),
  },
  {
    id: "jc-15",
    category: "สาขาอาชีพผลิตอาหาร\nและการแปรรูปอาหาร",
    jobs: ["นักออกแบบอาหาร", "พ่อครัว", "ผู้ปรุงอาหาร"],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_15.webp"),
  },
  {
    id: "jc-16",
    category: "สาขาอาชีพพลังงาน\nและสาธารณูปโภค",
    jobs: [
      "ผู้ปฏิบัติงานเครื่องจักรในการผลิตพลังงานไฟฟ้า",
      "วิศวกรรมพลังงานนิวเคลียร์",
    ],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_16.webp"),
  },
  {
    id: "jc-17",
    category: "สาขาอาชีพเฟอร์นิเจอร์",
    jobs: ["ช่างหุ้มเบาะเครื่องเรือน"],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_17.webp"),
  },
  {
    id: "jc-18",
    category: "สาขาอาชีพแฟชั่น\nและอุตสาหกรรมศิลป์",
    jobs: [
      "นักบิดแสงและสี",
      "ผู้จัดการศิลปิน",
      "กราฟิกดีไซเนอร์",
      "Animator",
      "นักออกแบบคอนเซ็ปต์",
      "นักออกแบบกลิ่น",
    ],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_18.webp"),
  },
  {
    id: "jc-19",
    category: "สาขาอาชีพไฟฟ้า\nและอิเล็กทรอนิกส์",
    jobs: ["ช่างเทคนิควิศวกรรมไฟฟ้า", "ช่างเทคนิควิศวกรรมอิเล็กทรอนิกส์"],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_19.webp"),
  },
  {
    id: "jc-20",
    category: "สาขาอาชีพระบบอัตโนมัติ\nและหุ่นยนต์",
    jobs: ["วิศวกรด้านปัญญาประดิษฐ์และหุ่นยนต์"],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_20.webp"),
  },
  {
    id: "jc-21",
    category: "สาขาอาชีพโลจิสติกส์\nและการขนส่ง",
    jobs: [
      "ตรวจนับสินค้า/แพ็คสินค้า",
      "ตัวแทนบริการขนส่ง",
      "ผู้ดูแลควบคุมโดรน",
      "วิศวกรขนส่ง",
    ],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_21.webp"),
  },
  {
    id: "jc-22",
    category: "สาขาอาชีพโลหการ",
    jobs: ["เจ้าหน้าที่เทคนิคโลหกรรม", "วิศวกรโลหการ"],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_22.webp"),
  },
  {
    id: "jc-23",
    category: "สาขาอาชีพเหมืองแร่",
    jobs: ["วิศวกรเหมืองแร่", "นักวิเคราะห์แร่", "พนักงานเหมืองแร่"],
    avatarSrc: getImgPath("Scene/Scene9/02/avatar_23.webp"),
  },
];

// ────────────────────────────────────────────────────
//  Carousel Config
// ────────────────────────────────────────────────────

//? แสดง 3 cards ต่อหน้า (ทั้ง Desktop แนวนอน และ Mobile แนวตั้ง)
export const ITEMS_PER_PAGE = 3;

//? Min selections ก่อน unlock scroll
export const MIN_SELECTIONS = 1;

//? Card frame image (decorative border around each card)
export const CARD_FRAME_SRC = getImgPath("Scene/Scene9/02/card_frame.webp");

//? Card frame image when selected
export const SELECTED_FRAME_SRC = getImgPath(
  "Scene/Scene9/02/selected_frame.webp",
);

//? Carousel navigation arrow images (ใช้ร่วมกับ s7_1)
export const ARROW_L_SRC = getImgPath("Scene/Scene7/02/arrow_l.webp");
export const ARROW_R_SRC = getImgPath("Scene/Scene7/02/arrow_r.webp");

// ────────────────────────────────────────────────────
//  Question Text
// ────────────────────────────────────────────────────

export const S9_2_QUESTION_TEXT =
  "เจ้าจะเลือกงานใด… สิ่งใดที่เจ้าอยากลองทำ\nและคิดว่าสามารถสร้างรายได้?";
