'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, ShoppingCart, ImageOff } from 'lucide-react';
import Link from 'next/link';
import { getFilePreview } from '@/lib/appwrite';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart';
import { useToast } from '@/components/ui/use-toast';

export function ProductCard({ product }) {
  const [imageUrl, setImageUrl] = useState('');
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (product.image) {
      if (product.image.startsWith('http')) {
        setImageUrl(product.image);
      } else {
        setImageUrl(getFilePreview(product.image));
      }
    }
  }, [product.image]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = () => {
    addItem({
      id: product.$id,
      name: product.name,
      price: parseFloat(product.offerPrice),
      image: imageUrl,
      quantity: 1,
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10">
      <div className="aspect-square relative overflow-hidden rounded-t-xl">
        {imageError || !imageUrl ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <ImageOff className="h-12 w-12 text-gray-600" />
          </div>
        ) : (
          <div className="relative h-full w-full">
            <img
              src={imageUrl}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        )}
      </div>

      <div className="relative space-y-4 p-6">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg text-gray-100 group-hover:text-purple-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-1">
            {product.category}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-gray-400 line-through text-sm">
              ₹{parseFloat(product.actualPrice).toLocaleString()}
            </p>
            <p className="text-lg font-bold text-purple-400">
              ₹{parseFloat(product.offerPrice).toLocaleString()}
            </p>
          </div>
          <p className="text-sm text-emerald-400">
            Save ₹
            {(
              parseFloat(product.actualPrice) - parseFloat(product.offerPrice)
            ).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link href={`/product/${product.$id}`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-purple-400 hover:text-purple-300 hover:bg-purple-400/10"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            onClick={handleAddToCart}
            className="relative overflow-hidden rounded-full bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
}