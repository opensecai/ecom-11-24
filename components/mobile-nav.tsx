'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  path: string;
}

interface MobileNavProps {
  items: NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="w-9 px-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-16 bg-background/95 backdrop-blur-sm border-b border-border p-4">
          <nav className="flex flex-col space-y-3">
            {items.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.path ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}