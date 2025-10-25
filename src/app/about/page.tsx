import { Cake, Heart, Users, Sparkles } from "lucide-react";
import { ValueCard, VisitUsCard } from "./components";
import { Header, PageHeader } from "@/components";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFFAFF]">
      <PageHeader
        title="About Sweet Delights"
        subtitle="Creating sweet memories since 2020"
      />
      <div className="container mx-auto px-4 py-4 max-w-4xl ">
        {/* Header */}

        {/* Our Story Section */}
        <div className="mb-16">
          <div className=" mb-6 ">
            <Header
              text="
            Our Story"
            />
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Sweet Delights was born from a passion for creating beautiful,
              delicious cakes that bring joy to every celebration. What started
              as a small home bakery has grown into a beloved local cake shop,
              serving our community with handcrafted desserts made with the
              finest ingredients.
            </p>
            <p>
              Our team of skilled bakers and decorators work tirelessly to
              ensure every cake is not just a dessert, but a work of art. From
              classic birthday cakes to elaborate wedding creations, we pour our
              hearts into every order.
            </p>
            <p>
              We believe that every celebration deserves a special cake, and
              we're honored to be part of your most memorable moments.
            </p>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-16">
          <div className=" mb-8 ">
            <Header text="Our Values" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ValueCard
              icon={Cake}
              title="Quality"
              description="We use only the finest ingredients to create cakes that taste as amazing as they look."
              iconColor="text-pink-400"
            />
            <ValueCard
              icon={Heart}
              title="Passion"
              description="Every cake is crafted with love and dedication to make your celebration truly special."
              iconColor="text-gray-400"
            />
            <ValueCard
              icon={Users}
              title="Community"
              description="We're proud to serve our local community and be part of your special moments."
              iconColor="text-gray-400"
            />
            <ValueCard
              icon={Sparkles}
              title="Creativity"
              description="We bring your vision to life with custom designs for any occasion."
              iconColor="text-pink-400"
            />
          </div>
        </div>

        {/* Visit Us Section */}
        <div>
          <div className="mb-8 ">
            <Header text="Visit Us" />
          </div>
          <VisitUsCard />
        </div>
      </div>
    </div>
  );
}
