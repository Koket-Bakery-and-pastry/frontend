// ...existing code...
import React from "react";
import { FaAward, FaHeart, FaBirthdayCake } from "react-icons/fa";

const values = [
  {
    icon: <FaAward className="text-[#C967AC] text-4xl" />,
    title: "Custom Designs",
    desc: "We use only the finest ingredients to create cakes that taste as good as they look.",
  },
  {
    icon: <FaHeart className="text-[#C967AC] text-4xl" />,
    title: "Made with Love",
    desc: "Every cake is hand crafted with care and attention to detail by our expert bakers.",
  },
  {
    icon: <FaBirthdayCake className="text-[#C967AC] text-4xl" />,
    title: "Custom Designs",
    desc: "Bring your vision to life with our fully customizable options for any ocassion.",
  },
];

function OurValues() {
  return (
    <section className="bg-[#FFFAFF] section-spacing">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-kaushan text-center mb-12">
          Why Choose Sweet Delights?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 items-stretch">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 text-center shadow-sm flex flex-col items-center justify-start"
            >
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                {v.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{v.title}</h3>
              <p className="text-gray-700 text-sm xl:text-base max-w-xs">
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
