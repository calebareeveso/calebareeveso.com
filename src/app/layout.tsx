import type { Metadata, Viewport } from "next";
import { Inter, DM_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const description =
  "Caleb Areeveso is a Computer Science student based in London with a passion for software engineering. I've enjoyed collaborating with startups on product development and design, turning innovative ideas into reality. I'm excited to connect and explore new opportunities to create and grow together!";

const ogDescription =
  "A college student with a passion for software engineering and a desire to create innovative solutions that make a positive impact on the world. I am committed to continual learning and growth as a software engineer";

export const metadata: Metadata = {
  metadataBase: new URL("https://calebareeveso.com"),
  title: "Caleb Areeveso",
  description,
  alternates: {
    canonical: "https://www.calebareeveso.com",
  },
  manifest: "/favicons/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicons/favicon.ico",
    apple: { url: "/favicons/apple-touch-icon.png", sizes: "180x180" },
    other: [
      {
        rel: "mask-icon",
        url: "/favicons/safari-pinned-tab.svg",
        color: "#3a3a3a",
      },
    ],
  },
  openGraph: {
    type: "website",
    url: "https://calebareeveso.com",
    title: "Caleb Areeveso",
    description: ogDescription,
    images: ["/static/images/calebareveso_banner.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Caleb Areeveso",
    description: ogDescription,
    images: ["/static/images/calebareveso_banner.jpg"],
  },
  verification: {
    google: "tVVhpkrocfGKdSKNMfX6etQiGioq7rqUc_uS5KCEEIs",
  },
  other: {
    "msapplication-TileColor": "#3a3a3a",
    "msapplication-config": "/favicons/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
