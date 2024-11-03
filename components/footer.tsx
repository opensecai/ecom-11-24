'use client';

import { Github, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black/60 backdrop-blur-xl mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Artisan Crafts
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Handcrafted with passion, delivered with care.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-purple-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/category/laser-wood" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Laser Wood Art
                </Link>
              </li>
              <li>
                <Link href="/category/neon-lights" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Neon Lights
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3 text-sm">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-purple-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-medium mb-3 text-sm">Newsletter</h4>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800/50 border-gray-700 text-sm"
              />
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap">
                Subscribe
              </Button>
            </form>
            <div className="flex space-x-4 mt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Artisan Crafts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}