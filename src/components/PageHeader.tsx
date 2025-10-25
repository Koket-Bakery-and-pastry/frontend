import React from "react";

const PageHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <section className="bg-pink-50 section-spacing text-center">
      <h1 className="text-4xl md:text-5xl font-kaushan mb-4">{title}</h1>
      <p className="text-gray-700 text-lg">{subtitle}</p>
    </section>
  );
};

export default PageHeader;
