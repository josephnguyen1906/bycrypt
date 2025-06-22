import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PrimaryLayoutComponent from "@/components/PrimaryLayout/PrimaryLayout.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-multi-carousel/lib/styles.css";

// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Staking",
  description: "Staking",
  icons: {
    icon: "images/tronvuongtron.png", // /public path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        <PrimaryLayoutComponent>{children}</PrimaryLayoutComponent>
        <ToastContainer />
      </body>
    </html>
  );
}
