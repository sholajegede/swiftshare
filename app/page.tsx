import { Features } from "@/components/sections/features";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}