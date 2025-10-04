import React from "react";
import {
  ProductDetailsInfo,
  ProductDescription,
  ProductReviews,
  RelatedProducts,
} from "../components";

function ProductDetail() {
  return (
    <div>
      <ProductDetailsInfo />
      <ProductDescription />
      <ProductReviews />
      <RelatedProducts />
    </div>
  );
}

export default ProductDetail;
