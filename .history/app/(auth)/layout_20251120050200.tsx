import type { Metadata } from "next";
import "../globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "SeoGovalle | Admin Dashboard",
  description: "SeoGovalle Authentication Layout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-[90vh] container flex flex-col items-center justify-between  p-4 md:p-0 my-20 md:my-0">
      {/* Image */}
      <div className="w-full ">
        <Image
          src={"/black-logo.svg"}
          width={200}
          height={200}
          alt="Pizza Logo"
          className="w-40 h-40 object-contain"
          priority
        />
      </div>

        {children}
    </div>
  );
}
