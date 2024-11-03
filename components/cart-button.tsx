'use client';

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import Link from "next/link";

export function CartButton() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart" className="relative">
      <Button variant="ghost" size="icon" className="w-9 px-0">
        <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
        <span className="sr-only">Shopping cart</span>
      </Button>
    </Link>
  );
}