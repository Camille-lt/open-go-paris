"use client";

import 'simplebar-react/dist/simplebar.min.css';
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import SimpleBar from 'simplebar-react';

// 1. On définit les polices ICI, juste après les imports
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full">
        <SimpleBar style={{ maxHeight: '100vh' }} autoHide={true}>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">
              {children}
            </main>
            <footer className="bg-brand-blue pt-5 pb-5 px-5 sm:pt-10 sm:pb-10 sm:px-6 border-t rounded-t-[50px] border-blue-400 mt-auto">
              <div className="max-w-md mx-auto text-center">
                <h1 className="text-white font-extrabold tracking-tight uppercase text-lg sm:text-2xl">
                  OPEN GO PARIS
                </h1>
                <p className="text-white text-xs sm:text-sm mt-2">
                  API Opendata.paris - Que Faire à Paris ?
                </p>
                <p className="text-blue-200 text-[9px] sm:text-[10px] mt-3 uppercase tracking-widest">
                  © by Camille LEBIGOT
                </p>
              </div>
            </footer>
          </div>
        </SimpleBar>
      </body>
    </html>
  );
}