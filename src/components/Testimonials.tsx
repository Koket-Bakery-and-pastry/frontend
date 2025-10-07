import React from "react";

const testimonials = [
  {
    name: "Michael Chen",
    review:
      "Ordered a custom birthday cake for my daughter and it exceeded all expectations. The attention to detail was incredible!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    review:
      "Ordered a custom birthday cake for my daughter and it exceeded all expectations. The attention to detail was incredible!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    review:
      "Ordered a custom birthday cake for my daughter and it exceeded all expectations. The attention to detail was incredible!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    review:
      "Ordered a custom birthday cake for my daughter and it exceeded all expectations. The attention to detail was incredible!",
    rating: 5,
  },
];

function Testimonials() {
  return (
    <section className="bg-[#FFFAFF] py-12 px-24 mt-8">
      <h2 className="text-3xl md:text-4xl font-kaushan text-center mb-12">
        What Our Customers Say
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-16">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg p-6 w-full md:w-72 flex flex-col mb-4 md:mb-0"
          >
            <div className="flex mb-2">
              {Array.from({ length: t.rating }).map((_, idx) => (
                <span key={idx} className="text-yellow-400 text-lg">
                  &#9733;
                </span>
              ))}
            </div>
            <p className="text-gray-800 mb-4">{t.review}</p>
            <span className="font-bold text-black">{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
