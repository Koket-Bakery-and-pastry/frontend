import React from "react";
import { FaAward, FaHeart, FaBirthdayCake } from "react-icons/fa";

const values = [
  {
    icon: <FaAward className="text-pink-400 text-4xl mb-2" />,
    title: "Custom Designs",
    desc: "We use only the finest ingredients to create cakes that taste as good as they look.",
  },
  {
    icon: <FaHeart className="text-pink-400 text-4xl mb-2" />,
    title: "Made with Love",
    desc: "Every cake is hand crafted with care and attention to detail by our expert bakers.",
  },
  {
    icon: <FaBirthdayCake className="text-pink-400 text-4xl mb-2" />,
    title: "Custom Designs",
    desc: "Bring your vision to life with our fully customizable options for any ocassion.",
  },
];

function OurValues() {
  return (
    <section className="bg-pink-50 py-12 px-24">
      <h2
        className="text-3xl md:text-4xl font-kaushan text-center mb-12"
        style={{ fontFamily: '"Kaushan Script", cursive' }}
      >
        Why Choose Sweet Delights?
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-start gap-10 md:gap-0">
        {values.map((v, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center text-center px-6"
          >
            <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              {v.icon}
            </div>
            <h3 className="font-bold text-lg mb-2">{v.title}</h3>
            <p className="text-gray-700">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OurValues;
