import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

const relatedProducts: Product[] = [
  {
    id: "1",
    name: "Marble Cake",
    price: 550,
    image: "/marble-cake.jpg",
    rating: 5,
    reviews: 18,
  },
  {
    id: "2",
    name: "Fruit Cake",
    price: 600,
    image: "/festive-fruit-cake.png",
    rating: 4.5,
    reviews: 12,
  },
  {
    id: "3",
    name: "Carrot Cake",
    price: 500,
    image: "/delicious-carrot-cake.png",
    rating: 5,
    reviews: 24,
  },
  {
    id: "4",
    name: "Cheesecake",
    price: 700,
    image: "/classic-cheesecake.png",
    rating: 4.5,
    reviews: 15,
  },
  {
    id: "5",
    name: "Chocolate Cake",
    price: 450,
    image: "/decadent-chocolate-cake.png",
    rating: 5,
    reviews: 32,
  },
  {
    id: "6",
    name: "Vanilla Cake",
    price: 400,
    image: "/vanilla-cake.png",
    rating: 4,
    reviews: 8,
  },
  {
    id: "7",
    name: "Red Velvet Cake",
    price: 650,
    image: "/red-velvet-cake.png",
    rating: 5,
    reviews: 28,
  },
  {
    id: "8",
    name: "Lemon Cake",
    price: 480,
    image: "/lemon-cake.jpg",
    rating: 4.5,
    reviews: 10,
  },
];

export function RelatedProducts() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {relatedProducts.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden transition-shadow hover:shadow-lg"
        >
          <div className="overflow-hidden bg-muted">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="h-48 w-full object-cover transition-transform hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-foreground">{product.name}</h3>
            <div className="mt-2 flex items-center gap-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviews})
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-lg font-bold text-primary">
                ₹{product.price}
              </span>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Add
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
