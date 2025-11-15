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
    <div className="h-screen flex flex-col items-center justify-center  p-4 md:p-0 my-20 md:my-0">
      {/* Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={"/next.svg"}
          width={200}
          height={200}
          alt="Man Diving"
          className="w-full h-auto object-cover "
          priority
        />
      </div>

        {children}
    </div>
  );
}
