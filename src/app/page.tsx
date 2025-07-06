import { Header, Footer } from "@/components/layout";
import { Hero, Pricing, FAQ, CTA } from "@/components/features";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
