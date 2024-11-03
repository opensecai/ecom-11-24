import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { account } from '@/lib/appwrite';

export async function middleware(request: NextRequest) {
  const adminEmails = ['admin@example.com']; // Add your admin email(s)

  if (request.nextUrl.pathname.startsWith('/admin')) {
    try {
      const session = await account.get();
      if (!session || !adminEmails.includes(session.email)) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};