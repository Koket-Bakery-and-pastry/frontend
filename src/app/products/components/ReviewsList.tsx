import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Review {
  id: string
  author: string
  title: string
  content: string
  rating: number
  avatar: string
}

const reviews: Review[] = [
  {
    id: "1",
    author: "Your name",
    title: "Title goes here",
    content:
      "I ordered a chocolate fudge cake for my birthday and it was beyond amazing! 🎂 The texture was soft, rich, and just the right amount of sweet. Everyone at the party kept asking where I got it from. The design was elegant and exactly like the photo. Definitely ordering again soon!",
    rating: 5,
    avatar: "Y",
  },
  {
    id: "2",
    author: "Alex Texas",
    title: "Absolutely perfect for my Wedding!",
    content:
      "I ordered a chocolate fudge cake for my birthday and it was beyond amazing! 🎂 The texture was soft, rich, and just the right amount of sweet. Everyone at the party kept asking where I got it from. The design was elegant and exactly like the photo. Definitely ordering again soon!",
    rating: 5,
    avatar: "A",
  },
  {
    id: "3",
    author: "Lana Max",
    title: "Delicious but arrived slightly late",
    content:
      "The cake tasted amazing — soft sponge and fresh cream that melted in the mouth! 😋 However, delivery was about 30 minutes late. Still, the taste totally made up for it. I'll definitely give them another try, maybe for my next anniversary.",
    rating: 4,
    avatar: "L",
  },
  {
    id: "4",
    author: "Daniel K.",
    title: "Best red velvet cake in town!",
    content:
      "I've tried red velvet from many bakeries, but this one takes the crown. 👑 Moist layers, creamy frosting, and that rich flavor you can't forget. Delivery was quick and the packaging was beautiful. Perfect from start to finish!",
    rating: 5,
    avatar: "D",
  },
]


export function ReviewsList() {
  return (
    <div className="relative">
      {/* Floating add review button */}
      {/* <div className="absolute right-0 -top-8">
        <Button className="bg-[#C967AC] hover:bg-[#bd5b9e] text-white rounded-full px-4 py-2">
          + Add Review
        </Button>
      </div> */}

      <div className="space-y-4 mt-6">
        {reviews.length === 0 ? (
          <div className="rounded-lg border border-border p-8 text-center bg-white">
            <p className="text-muted-foreground">No reviews yet. Be the first to review! 🍰</p>
          </div>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="p-6 border border-border rounded-lg">
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-semibold">
                  {review.avatar}
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-[#C967AC]">{review.author}</p>
                      <p className="text-sm text-muted-foreground">{review.title}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{review.content}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

