'use client';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';

interface Banner {
  $id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

interface BannerProps {
  banners: Banner[];
}

export function Banner({ banners }: BannerProps) {
  if (!banners.length) return null;

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.$id}>
            <div className="relative h-[50vh] md:h-[70vh] rounded-lg md:rounded-3xl overflow-hidden">
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90" />
              <div className="absolute inset-0 backdrop-blur-sm" />
              <div className="relative h-full flex items-center justify-center text-center px-4">
                <div className="max-w-3xl space-y-4 md:space-y-6">
                  <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                    {banner.title}
                  </h1>
                  <p className="text-base md:text-xl text-gray-300">
                    {banner.subtitle}
                  </p>
                  <Button
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700"
                    asChild
                  >
                    <Link href={banner.buttonLink}>{banner.buttonText}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}