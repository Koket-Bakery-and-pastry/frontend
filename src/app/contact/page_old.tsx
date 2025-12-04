import { Phone, Mail, MapPin, Clock } from "lucide-react";
import {
  LocationSection,
  ContactForm,
  ContactMethodCard,
  BookingHoursSidebar,
} from "./components";
import { Header, PageHeader } from "@/components";
import MethodCards from "./components/MethodCards";

export default function ContactPage() {
  return (
    <div className="bg-background ">
      <PageHeader
        title="Get in Touch"
        subtitle="Have a question about cakes our cakes or want to discuss a custom order? We’d love to hear from you!"
      />
      <div className=" ">
        <div className="">
          {/* Main Content */}
          <div className=" space-y-12 ">
            {/* Header */}

            {/* Contact Method Cards */}
            <MethodCards />
            {/* Contact Form */}

            <ContactForm />

            {/* Location Section */}
            <div className="bg-background-2 section-spacing">
              <div className="mb-8">
                <Header text=" Find Our Bakery" />
              </div>

              <LocationSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// import { Phone, Mail, MapPin, Clock } from "lucide-react";
// import {
//   LocationSection,
//   ContactForm,
//   ContactMethodCard,
//   BookingHoursSidebar,
// } from "./components";
// import { Header, PageHeader } from "@/components";
// import MethodCards from "./components/MethodCards";

// export default function ContactPage() {
//   return (
//     <div className="bg-background min-h-screen">
//       <div className="py-6 sm:py-8 md:py-12">
//         <div className="section-spacing mb-8 sm:mb-10">
//           <PageHeader
//             title="Get in Touch"
//             subtitle="Have a question about our cakes or want to discuss a custom order? We'd love to hear from you!"
//           />
//         </div>

//         {/* Main Content */}
//         <div className="space-y-12 sm:space-y-16">
//           {/* Contact Method Cards */}
//           <div className="section-spacing">
//             <MethodCards />
//           </div>

//           {/* Contact Form */}
//           <div className="section-spacing">
//             <ContactForm />
//           </div>

//           {/* Location Section */}
//           <div className="bg-background-2 py-12 sm:py-16">
//             <div className="section-spacing">
//               <div className="mb-8 sm:mb-10">
//                 <Header text="Find Our Bakery" />
//               </div>
//               <LocationSection />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// 