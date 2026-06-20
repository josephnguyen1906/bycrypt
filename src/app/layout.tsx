import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PrimaryLayoutComponent from "@/components/PrimaryLayout/PrimaryLayout.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-multi-carousel/lib/styles.css";

const inter = Inter({ subsets: ["latin"] });

const DEFAULT_SEO = { title: "KCEX", description: "KCEX" };

async function getSeo() {
  const apiBase = (
    process.env.NEXT_PUBLIC_API_URL || "https://cms.wnskcex.com"
  ).replace(/\/$/, "");

  try {
    const res = await fetch(`${apiBase}/api/config`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      return DEFAULT_SEO;
    }

    const json = await res.json();
    return {
      title: json?.data?.webname || DEFAULT_SEO.title,
      description: json?.data?.webtitle || DEFAULT_SEO.description,
    };
  } catch {
    return DEFAULT_SEO;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();

  return {
    title: seo.title,
    description: seo.description,
    icons: {
      icon: "/images/logo.png",
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
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
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
