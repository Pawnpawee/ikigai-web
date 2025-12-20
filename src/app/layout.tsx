import type { Metadata } from "next";
import { Anuphan, Bentham, Luxurious_Script } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "./contexts/AudioContext";
import AppWrapper from "./AppWrapper";
import OrientationGuard from "./components/OrientationGuard";
import { DeviceProvider } from "./contexts/DeviceContext";
import { UIStarProvider } from "./contexts/UIStarContext";
import StarryBackground from "./components/StarryBackground";

const anuphan = Anuphan({
  variable: "--font-anuphan",
  subsets: ["thai", "latin"],
  display: "swap",
});

const bentham = Bentham({
  variable: "--font-bentham",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const luxuriousScript = Luxurious_Script({
  variable: "--font-luxurious-script",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ikigai - Life Of Journey",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anuphan.variable} ${bentham.variable} ${luxuriousScript.variable} antialiased`}
      >
        <DeviceProvider>
          <OrientationGuard />
          {/* //todo: wait for design */}
          <AudioProvider>
            <UIStarProvider>
              <StarryBackground />
              <AppWrapper>{children}</AppWrapper>
            </UIStarProvider>
          </AudioProvider>
        </DeviceProvider>
      </body>
    </html>
  );
}
