import { LazyMotion, domAnimation } from "framer-motion";
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Anuphan,
  Bentham,
  Luxurious_Script,
} from "next/font/google";
import "./globals.css";
import { AudioProvider } from "./contexts/AudioContext";
import AppWrapper from "./AppWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anuphan = Anuphan({
  variable: "--font-anuphan", // ชื่อตัวแปรที่จะไปโผล่ใน CSS
  subsets: ["thai", "latin"], // โหลดภาษาไทยและอังกฤษ
  display: "swap",
});

const bentham = Bentham({
  variable: "--font-bentham",
  weight: "400", // Bentham มีแค่ weight 400
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
  description:
    '"Ikigai: The Journey of Life" is an AI-powered interactive website designed to help graduating students and first-time job seekers discover their purpose. It combines interactive storytelling with a specialized AI to guide users in finding their "Ikigai," preparing them for a confident and meaningful transition into the working world.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`$${geistSans.variable} 
          ${geistMono.variable} 
          ${anuphan.variable} 
          ${bentham.variable} 
          ${luxuriousScript.variable} antialiased`}
      >
        <LazyMotion features={domAnimation}>
          <AudioProvider>
            <AppWrapper>{children}</AppWrapper>
          </AudioProvider>
        </LazyMotion>
      </body>
    </html>
  );
}
