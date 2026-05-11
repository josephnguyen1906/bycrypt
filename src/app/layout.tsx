import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PrimaryLayoutComponent from "@/components/PrimaryLayout/PrimaryLayout.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-multi-carousel/lib/styles.css";

const inter = Inter({ subsets: ["latin"] });

async function getSeo() {
  const res = await fetch("https://api.mitradeforexx.com/api/config", {
    cache: "no-store", // nếu muốn luôn fetch mới
  });

  if (!res.ok) {
    return {
      title: "Convert",
      description: "Convert",
    };
  }

  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();

  return {
    title: seo?.data?.webname || "Convert",
    description: seo?.data?.webtitle || "Convert",
    icons: {
      icon: seo?.data?.weblogo,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@3.2/dist/add-to-homescreen.min.css"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo2.png" />
      </head>

      <body className={inter.className}>
        <PrimaryLayoutComponent>{children}</PrimaryLayoutComponent>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </body>
    </html>
  );
}
