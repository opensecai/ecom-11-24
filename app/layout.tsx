import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Artisan Crafts - Laser Wood Art, Neon Lights & 3D Prints',
  description: 'Discover unique handcrafted items including laser wood art, neon lights, and 3D prints.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="artisan-theme"
        >
          {/* Only show navbar and footer if not in admin section */}
          {!children.toString().includes('/admin') ? (
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-6">{children}</div>
              </main>
              <Footer />
            </div>
          ) : (
            children
          )}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}