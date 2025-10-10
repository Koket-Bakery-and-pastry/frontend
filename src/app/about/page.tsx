import { Cake, Heart, Users, Sparkles } from "lucide-react";
import { ValueCard, VisitUsCard } from "./components";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif italic mb-3 text-foreground">
            About Sweet Delights
          </h1>
          <p className="text-muted-foreground">
            Creating sweet memories since 2020
          </p>
        </div>

        {/* Our Story Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif italic text-center mb-6 text-foreground">
            Our Story
          </h2>
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
          <h2 className="text-3xl font-serif italic text-center mb-8 text-foreground">
            Our Values
          </h2>
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
          <h2 className="text-3xl font-serif italic text-center mb-8 text-foreground">
            Visit Us
          </h2>
          <VisitUsCard />
        </div>
      </div>
    </div>
  );
}
