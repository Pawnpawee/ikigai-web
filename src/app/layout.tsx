import { LazyMotion, domAnimation } from "framer-motion";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
