import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { NotesChromeProvider } from "@/components/NotesChromeContext";
import "katex/dist/katex.min.css";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "2026F Course Notes",
  description: "Course notes and quizzes for COMP2211, COMP2711, and COMP3511",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} h-full`}>
      <body className="min-h-full flex flex-col font-mono">
        <NotesChromeProvider>
          <NavBar />
          <main className="flex-1">{children}</main>
        </NotesChromeProvider>
      </body>
    </html>
  );
}
