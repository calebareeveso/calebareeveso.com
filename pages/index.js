import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
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
        <meta name="title" content="Caleb Areeveso — Front-end Engineer " />
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
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
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
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        />
      </Head>
      <main>
        <header>
          <h1 className="text-3xl">My personal website</h1>
        </header>
      </main>
    </>
  );
}
