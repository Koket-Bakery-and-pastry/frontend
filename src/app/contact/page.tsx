import { Phone, Mail, MapPin, Clock } from "lucide-react";
import {
  LocationSection,
  ContactForm,
  ContactMethodCard,
  BookingHoursSidebar,
} from "./components";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="">
          {/* Main Content */}
          <div className=" space-y-12">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-serif italic mb-3 text-foreground">
                Get in Touch
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                Have a question about cakes we make or want to discuss an custom
                order? Need more to hear from you!
              </p>
            </div>

            {/* Contact Method Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <ContactMethodCard
                icon={Phone}
                label="Cup Cakes"
                iconColor="text-pink-400"
              />
              <ContactMethodCard
                icon={Mail}
                label="Cup Cakes"
                iconColor="text-blue-400"
              />
              <ContactMethodCard
                icon={MapPin}
                label="Cup Cakes"
                iconColor="text-orange-400"
              />
              <ContactMethodCard
                icon={Clock}
                label="Cup Cakes"
                iconColor="text-pink-400"
              />
            </div>

            {/* Contact Form */}
            <ContactForm />

            {/* Location Section */}
            <div>
              <h2 className="text-3xl md:text-4xl font-serif italic text-center mb-8 text-foreground">
                Find Our Bakery
              </h2>
              <LocationSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
