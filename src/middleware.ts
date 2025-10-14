import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protected routes
  const protectedRoutes = ['/dashboard', '/onboarding'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Admin routes
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  // Allow demo mode for dashboard
  const isDemoMode = request.nextUrl.searchParams.get('demo') === 'true';

  // Redirect logic
  // Temporarily disabled for development - allow access to dashboard pages
  // TODO: Re-enable after proper authentication is set up
  // if (isProtectedRoute && !user && !isDemoMode) {
  //   // Redirect to login if not authenticated
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  if (isAdminRoute && !user) {
    // Admin routes require authentication
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is logged in and tries to access login/signup, redirect to dashboard
  if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};


