// ...existing code...
import React from "react";
import { FaAward, FaHeart, FaBirthdayCake } from "react-icons/fa";
import Header from "./Header";

const values = [
  {
    icon: <FaAward className="text-primary text-4xl" />,
    title: "Custom Designs",
    desc: "We use only the finest ingredients to create cakes that taste as good as they look.",
  },
  {
    icon: <FaHeart className="text-primary text-4xl" />,
    title: "Made with Love",
    desc: "Every cake is hand crafted with care and attention to detail by our expert bakers.",
  },
  {
    icon: <FaBirthdayCake className="text-primary text-4xl" />,
    title: "Custom Designs",
    desc: "Bring your vision to life with our fully customizable options for any ocassion.",
  },
];

function OurValues() {
  return (
    <section className="bg-background/50 section-spacing-y">
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          <Header text="Why Choose Sweet Delights?" />
          <p className="mt-3 xs:mt-4 text-muted-foreground text-sm xs:text-base md:text-lg max-w-2xl mx-auto">
            Quality ingredients, expert craftsmanship, and personalized service
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 sm:gap-7 md:gap-8 lg:gap-10">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-6 sm:p-7 md:p-8 text-center shadow-lg hover:shadow-xl border-2 border-border hover:border-primary/50 transition-all duration-300 flex flex-col items-center group"
            >
              <div className="bg-secondary group-hover:bg-primary/10 rounded-full w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center mb-4 sm:mb-5 md:mb-6 transition-colors duration-300">
                {v.icon}
              </div>
              <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3 text-card-foreground group-hover:text-primary transition-colors duration-300">
                {v.title}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurValues;
// ...existing code...
