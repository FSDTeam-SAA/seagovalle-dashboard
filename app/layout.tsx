import { Poppins } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/lib/providers/tanstackProvider";
import { Toaster } from "sonner";
import Provider from "@/lib/providers/Provider";
import { Metadata } from "next";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pizza Craving | Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased font-poppins`}>
        <TanstackProvider>
          <Provider>{children}</Provider>
          <Toaster
            position="top-center"
            richColors
            closeButton
            duration={4000}
            visibleToasts={3}
            offset={16}
          />
        </TanstackProvider>
      </body>
    </html>
  );
}
