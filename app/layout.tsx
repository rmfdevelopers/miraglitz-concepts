import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const heading = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"]
});

const body = Inter({ 
  subsets: ["latin"], 
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Miraglitz Concepts | Precision Industrial Printing",
  description: "High-volume industrial printing and bespoke corporate branding in Nigeria.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}