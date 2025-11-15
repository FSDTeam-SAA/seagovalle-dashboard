import type { Metadata } from "next";
import "../globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Scuba Stevener | Dive Into Adventure",
  description: "From beginner to pro, we guide your underwater adventure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col-reverse md:flex-row items-center justify-center  p-4 md:p-0 my-20 md:my-0">
      

      <div className="w-full md:w-1/2 flex items-center justify-start pl-4 md:pl-2 lg:p-32">
        {children}
      </div>
    </div>
  );
}
