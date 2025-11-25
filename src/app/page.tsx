import {
  Hero,
  CategorySection,
  FeaturedSection,
  Testimonials,
  OurValues,
  CallToAction,
} from "@/components";

export default function Home() {
  return (
    <main className="bg-background">
      <Hero />
      <CategorySection />
      <FeaturedSection />
      <OurValues />
      <Testimonials />
      <CallToAction />
    </main>
  );
}
