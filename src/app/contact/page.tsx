import { Phone, Mail, MapPin, Clock } from "lucide-react";
import {
  LocationSection,
  ContactForm,
  ContactMethodCard,
  BookingHoursSidebar,
} from "./components";
import { PageHeader } from "@/components";

export default function ContactPage() {
  return (
    <div className="bg-[#FFFAFF]">
      <PageHeader
        title="Get in Touch"
        subtitle="Have a question about cakes our cakes or want to discuss a custom order? We’d love to hear from you!"
      />
      <div className="container mx-auto px-4 py-12 ">
        <div className="">
          {/* Main Content */}
          <div className=" space-y-12 ">
            {/* Header */}

            {/* Contact Method Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">
              <ContactMethodCard
                icon={Phone}
                label="Call"
                text1="(555) 123-4567"
                text2="test"
                iconColor="text-pink-400"
              />
              <ContactMethodCard
                icon={Mail}
                label="Email Us"
                text1="hello@sweetdelights.com"
                text2="mWe reply within 24 hours"
                iconColor="text-blue-400"
              />
              <ContactMethodCard
                icon={MapPin}
                label="Cup Cakes"
                text1="hello@sweetdelights.com"
                text2="mWe reply within 24 hours"
                iconColor="text-orange-400"
              />
              <ContactMethodCard
                icon={Clock}
                label="Cup Cakes"
                text1="hello@sweetdelights.com"
                text2="mWe reply within 24 hours"
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
