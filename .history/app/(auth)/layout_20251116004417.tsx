import type { Metadata } from "next";
import "../globals.css";

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
    <div className="h-screen flex flex-col md:flex-row items-center justify-center  p-4 md:p-0 my-20 md:my-0">
      {/* Image */}
      {/* <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={"/images/authImage.png"}
          width={1024}
          height={1024}
          alt="Man Diving"
          className="w-full h-auto max-h-[300px] md:max-h-full object-cover "
          priority
        />
      </div> */}

        {children}
    </div>
  );
}
