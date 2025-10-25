// ...existing code...
import React from "react";
import Header from "./Header";

const testimonials = [
  {
    name: "Michael Chen",
    review:
      "Ordered a custom birthday cake for my daughter and it exceeded all expectations. The attention to detail was incredible!",
    rating: 5,
  },
  {
    name: "Aisha Rahman",
    review:
      "Beautiful cake and amazing service — exactly what we wanted for the celebration. Highly recommend!",
    rating: 5,
  },
  {
    name: "Daniel Kim",
    review:
      "Flavors were spot on and the design was flawless. Will order again for sure.",
    rating: 5,
  },
  {
    name: "Sofia Martinez",
    review:
      "Great customer support and timely delivery. The cake arrived fresh and delicious!",
    rating: 5,
  },
];

function Testimonials() {
  return (
    <section className="bg-[#FFFAFF] section-spacing">
      <div className=" mb-12">
        <Header
          text="
        What Our Customers Say"
        />
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-4 gap-6 items-stretch">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col"
          >
            <div className="flex mb-3">
              {Array.from({ length: t.rating }).map((_, idx) => (
                <span key={idx} className="text-yellow-400 text-lg mr-1">
                  &#9733;
                </span>
              ))}
            </div>

            <p className="text-gray-800 mb-4 flex-1 overflow-hidden line-clamp-4">
              {t.review}
            </p>

            <span className="font-bold text-black mt-4">{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
// ...existing code...
