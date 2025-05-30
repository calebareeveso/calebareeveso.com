import Head from "next/head";
import Image from "next/image";
import React from "react";
// import {
//   Header,
// } from "../../components";
// import Link from "next/link";

export default function Main({ children, ...props }) {
  return (
    <>
      <div className="wrapper">
        <div className="max-w-xl mx-auto container px-4">
          <div className="container mx-auto">
            <Head>
              {/* canonical */}
              <link rel="canonical" href="https://www.calebareeveso.com" />
              {/* Favicons */}
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/favicons/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicons/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicons/favicon-16x16.png"
              />
              <link rel="manifest" href="/favicons/site.webmanifest" />
              <link
                rel="mask-icon"
                href="/favicons/safari-pinned-tab.svg"
                color="#3a3a3a"
              />
              <link rel="shortcut icon" href="/favicons/favicon.ico" />
              <meta name="msapplication-TileColor" content="#3a3a3a" />
              <meta
                name="msapplication-config"
                content="/favicons/browserconfig.xml"
              />
              <meta name="theme-color" content="#ffffff" />

              {/* Meta Tags */}
              <title>Caleb Areeveso </title>
              <meta name="title" content="Caleb Areeveso " />
              <meta
                name="description"
                content="Caleb Areeveso is a Computer Science student based in London with a passion for software engineering. I've enjoyed collaborating with startups on product development and design, turning innovative ideas into reality. I'm excited to connect and explore new opportunities to create and grow together!"
              />

              {/* Open Graph / Facebook */}
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://calebareeveso.com" />
              <meta property="og:title" content="Caleb Areeveso " />
              <meta
                property="og:description"
                content="A college student with a passion for software engineering and a desire to create innovative solutions that make a positive impact on the world. I am committed to continual learning and growth as a software engineer"
              />
              <meta
                property="og:image"
                content="https://calebareeveso.com/static/images/calebareveso_banner.jpg"
              />
              {/* Twitter */}
              <meta property="twitter:card" content="summary_large_image" />
              <meta
                property="twitter:url"
                content="https://calebareeveso.com"
              />
              <meta property="twitter:title" content="Caleb Areeveso " />
              <meta
                property="twitter:description"
                content=" A college student with a passion for software engineering and a desire to create innovative solutions that make a positive impact on the world. I am committed to continual learning and growth as a software engineer"
              />
              <meta
                property="twitter:image"
                content="https://calebareeveso.com/static/images/calebareveso_banner.jpg"
              />
              {/* Google Site Verification */}
              <meta
                name="google-site-verification"
                content="tVVhpkrocfGKdSKNMfX6etQiGioq7rqUc_uS5KCEEIs"
              />
            </Head>

            <main className="grid gap-6 grid-cols-1">{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
