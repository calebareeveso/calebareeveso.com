import Header from "@/components/header";
import About from "@/components/about";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="wrapper flex justify-center items-center min-h-screen">
      <div className="max-w-xl mx-auto container px-4">
        <div className="container mx-auto">
          <main className="grid gap-6 grid-cols-1">
            <Header />
            <About />
            <Newsletter />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}
