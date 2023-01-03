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
        <div className="max-w-lg mx-auto container px-4 ">
          <div className="container mx-auto">
            <Head>
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
              <title>Caleb Areeveso — Front-end Engineer </title>
              <meta
                name="title"
                content="Caleb Areeveso — Front-end Engineer "
              />
              <meta
                name="description"
                content="Front-end Engineer - Developing web-based software with a lot of depth and detail in terms of both visuals and functionality"
              />

              {/* Open Graph / Facebook */}
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://metatags.io/" />
              <meta
                property="og:title"
                content="Caleb Areeveso — Front-end Engineer "
              />
              <meta
                property="og:description"
                content="Front-end Engineer - Developing web-based software with a lot of depth and detail in terms of both visuals and functionality"
              />
              <meta
                property="og:image"
                content="https://calebareeveso.com/static/images/calebareveso_banner.png"
              />
              {/* Twitter */}
              <meta property="twitter:card" content="summary_large_image" />
              <meta property="twitter:url" content="https://metatags.io/" />
              <meta
                property="twitter:title"
                content="Caleb Areeveso — Front-end Engineer "
              />
              <meta
                property="twitter:description"
                content="Front-end Engineer - Developing web-based software with a lot of depth and detail in terms of both visuals and functionality"
              />
              <meta
                property="twitter:image"
                content="https://calebareeveso.com/static/images/calebareveso_banner.png"
              />
            </Head>

            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
