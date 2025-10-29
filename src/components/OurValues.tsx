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
    <section className="bg-background/50 section-spacing mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className=" mb-12">
          <Header
            text="
          Why Choose Sweet Delights?"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 items-stretch">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 text-center shadow-sm flex flex-col items-center justify-start"
            >
              <div className="bg-secondary rounded-full w-16 h-16 flex items-center justify-center mb-4">
                {v.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{v.title}</h3>
              <p className="text-foreground text-sm xl:text-base max-w-xs">
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
