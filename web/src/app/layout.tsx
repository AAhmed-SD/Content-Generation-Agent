import type { Metadata } from "next";
import { Caveat, Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

const script = Caveat({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "offload desk",
  description: "The Monday desk for Offload. Two people stamp the week before anyone posts.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
