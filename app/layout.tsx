import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../src/styles/globals.css";
import Favicon from "../public/favicon.png";

const inter = Roboto({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Ollert",
  description: "Project management tool",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
