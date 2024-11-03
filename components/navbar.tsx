import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { CartButton } from "@/components/cart-button";
import { UserMenu } from "@/components/user-menu";
import { MobileNav } from "@/components/mobile-nav";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Laser Wood Art", path: "/category/laser-wood" },
  { name: "Neon Lights", path: "/category/neon-lights" },
  { name: "3D Prints", path: "/category/3d-prints" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-14 flex items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Artisan Crafts
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <CartButton />
            <UserMenu />
            <MobileNav items={navItems} />
          </nav>
        </div>
      </div>
    </nav>
  );
}