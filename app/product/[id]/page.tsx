'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Star, ShoppingCart } from 'lucide-react';
import { databases, DATABASE_ID, PRODUCTS_COLLECTION_ID, getFilePreview } from '@/lib/appwrite';
import { useCart } from '@/lib/cart';
import { useToast } from '@/components/ui/use-toast';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        params.id
      );
      
      // Transform image URLs
      const productWithImages = {
        ...response,
        images: [
          response.image,
          // Add more image IDs here when available
        ].filter(Boolean).map(getFilePreview)
      };
      
      setProduct(productWithImages);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.$id,
      name: product.name,
      price: parseFloat(product.offerPrice),
      image: product.images[0],
      quantity: 1,
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement review submission logic here
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
    setReview('');
    setRating(5);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((image: string, index: number) => (
                <CarouselItem key={index}>
                  <div className="aspect-square relative rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image: string, index: number) => (
              <div
                key={index}
                className="aspect-square relative rounded-md overflow-hidden cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-400">{product.category}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <p className="text-3xl font-bold text-purple-400">
                ₹{parseFloat(product.offerPrice).toLocaleString()}
              </p>
              <p className="text-xl text-gray-400 line-through">
                ₹{parseFloat(product.actualPrice).toLocaleString()}
              </p>
            </div>
            <p className="text-green-400">
              Save ₹
              {(
                parseFloat(product.actualPrice) - parseFloat(product.offerPrice)
              ).toLocaleString()}
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <p>{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Availability:</span>
              {product.stock > 0 ? (
                <span className="text-green-400">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-400">Out of Stock</span>
              )}
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-purple-600 hover:bg-purple-700 h-12"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        <form onSubmit={handleReviewSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-1 ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                >
                  <Star className="h-6 w-6 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Review</label>
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              className="h-32"
              required
            />
          </div>

          <Button type="submit">Submit Review</Button>
        </form>

        <div className="space-y-4">
          {/* Sample reviews - replace with actual reviews from backend */}
          {[
            {
              name: "John Doe",
              rating: 5,
              comment: "Excellent product! The quality is outstanding.",
              date: "2024-01-15"
            },
            {
              name: "Jane Smith",
              rating: 4,
              comment: "Very good product, but delivery took longer than expected.",
              date: "2024-01-10"
            }
          ].map((review, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{review.name}</p>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
              <p className="text-gray-300">{review.comment}</p>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}