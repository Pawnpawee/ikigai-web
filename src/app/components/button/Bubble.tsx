import Image from "next/image";
import { getImgPath } from "@/utils/cloudinaryUtils";

interface BubbleProps {
  text: string;
  className?: string;
}

export default function Bubble({ text, className = "" }: BubbleProps) {
  return (
    <div className={`relative w-full h-full ${className} isolate`}>
      {/*? next/image with fill proxies through /_next/image (same-origin), 
          eliminating the direct Cloudinary third-party connection */}
      <Image
        src={getImgPath("Scene/Scene2/bubble.webp")}
        alt=""
        fill
        sizes="100%"
        quality={85}
        className="absolute inset-0 object-fill"
        aria-hidden="true"
      />
      {/* Text layer without blend mode */}
      <div className="relative box-border content-stretch flex gap-2.5 items-center justify-center w-full h-full">
        <p className="text-center text-background">{text}</p>
      </div>
    </div>
  );
}
