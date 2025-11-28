import { motion } from "framer-motion";

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
          backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 295 176.08" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect x="0" y="0" height="100%" width="100%" fill="url(%23grad)" opacity="1"/><defs><radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="matrix(14.745 0 0 8.7674 146.79 87.04)"><stop stop-color="rgba(255,255,255,1)" offset="0"/><stop stop-color="rgba(236,236,236,1)" offset="0.11"/><stop stop-color="rgba(187,187,187,1)" offset="0.32"/><stop stop-color="rgba(148,148,148,1)" offset="0.47"/><stop stop-color="rgba(108,108,108,1)" offset="0.62"/><stop stop-color="rgba(81,81,81,1)" offset="0.715"/><stop stop-color="rgba(54,54,54,1)" offset="0.81"/><stop stop-color="rgba(41,41,41,1)" offset="0.8575"/><stop stop-color="rgba(27,27,27,1)" offset="0.905"/><stop stop-color="rgba(14,14,14,1)" offset="0.9525"/><stop stop-color="rgba(7,7,7,1)" offset="0.97625"/><stop stop-color="rgba(0,0,0,1)" offset="1"/></radialGradient></defs></svg>')`,
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
