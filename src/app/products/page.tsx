import { ProductCard, PageHeader } from "@/components";
import React from "react";

function ProductsPage() {
  return (
    <div>
      <h1>Product Page</h1>
      <PageHeader />
      <div>Filtration</div>
      <ProductCard />
    </div>
  );
}

export default ProductsPage;
