import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient, repositoryName } from "@/prismicio"
import { PrismicPreview } from "@prismicio/next";

const geistSans = Urbanist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Urbanist({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.meta_title,
    description: settings.data.meta_description,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-900 text-slate-100">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Header />
        {children}
        <div className="absolute inset-0 -z-50 max-h-screen background-gradient"></div>
        <div className="absolute pointer-events-none inset-0 -z-40 h-full bg-[url('/noisetexture.jgp')]
        opacity-20 mix-blend-soft-light"></div>
        <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}

