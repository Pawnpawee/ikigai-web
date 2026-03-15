import type { Metadata, Viewport } from "next";
import { Anuphan, Bentham } from "next/font/google";
import "./globals.css";
import AppWrapper from "./AppWrapper";
import OrientationGuard from "./components/OrientationGuard";
import StarryBackground from "./components/StarryBackground";
import { AudioProvider } from "./contexts/AudioContext";
import { DeviceProvider } from "./contexts/DeviceContext";
import { UIStarProvider } from "./contexts/UIStarContext";
import { UserProvider } from "./contexts/UserContext";

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

export const metadata: Metadata = {
  title: "Ikigai - Life Of Journey",
  description:
    "Discover Your Ikigai: Uncover the intersection of passion, mission, vocation, and profession to find purpose and fulfillment in life.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anuphan.variable} ${bentham.variable} antialiased`}>
        <DeviceProvider>
          <OrientationGuard />
          {/* //todo: wait for design */}
          <AudioProvider>
            <UserProvider>
              <UIStarProvider>
                <StarryBackground />
                <AppWrapper>{children}</AppWrapper>
              </UIStarProvider>
            </UserProvider>
          </AudioProvider>
        </DeviceProvider>
      </body>
    </html>
  );
}
