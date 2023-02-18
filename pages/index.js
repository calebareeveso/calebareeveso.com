import Head from "next/head";
import Image from "next/image";

// import components
import { Layout, Header, About, Projects, Footer } from "../components/index";
export default function Home() {
  return (
    <Layout>
      <Header />
      <About />
      <Projects />
      <Footer />
    </Layout>
  );
}
