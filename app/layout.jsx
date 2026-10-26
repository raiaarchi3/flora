import "./globals.css";
import Header from "@/components/Header";
import { Italiana, DM_Sans } from "next/font/google";

const display = Italiana({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Flora — Flower species guide",
  description: "Origins, facts and details about flowers of the Daisy family.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans">
        <Header />
        {children}
      </body>
    </html>
  );
}
