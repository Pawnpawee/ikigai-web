import { getImgPath } from "@/utils/cloudinaryUtils";

interface BubbleProps {
  text: string;
  className?: string;
}

export default function Bubble({ text, className = "" }: BubbleProps) {
  return (
    <div className={`relative w-full h-full ${className} isolate`}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${getImgPath("Scene/Scene2/bubble.webp")}')`,
          backgroundSize: "100% 100%",
        }}
      />
      {/* Text layer without blend mode */}
      <div className="relative box-border content-stretch flex gap-2.5 items-center justify-center w-full h-full">
        <p className="text-center text-background">{text}</p>
      </div>
    </div>
  );
}
