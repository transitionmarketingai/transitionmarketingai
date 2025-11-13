import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // If Supabase is not configured, skip auth and allow all routes
    if (!supabaseUrl || !supabaseAnonKey) {
      // Allow demo mode for dashboard - check query param or cookie
      const isDemoModeParam = request.nextUrl.searchParams.get('demo') === 'true';
      const isDemoModeCookie = request.cookies.get('demo_mode')?.value === 'true';
      const isDemoMode = isDemoModeParam || isDemoModeCookie;

      // If demo mode param is present, set the cookie
      if (isDemoModeParam && !isDemoModeCookie) {
        response.cookies.set('demo_mode', 'true', {
          path: '/',
          maxAge: 60 * 60 * 24, // 24 hours
          sameSite: 'lax',
          httpOnly: false,
        });
      }

      // Protected routes - allow in demo mode or skip auth
      const protectedRoutes = ['/dashboard', '/onboarding'];
      const isProtectedRoute = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      );

      if (isProtectedRoute && !isDemoMode) {
        // Redirect to login if not in demo mode
        return NextResponse.redirect(new URL('/login', request.url));
      }

      return response;
    }

    // Create Supabase client with error handling
    let supabase;
    try {
      supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
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
    } catch (error) {
      // If Supabase client creation fails, continue without auth
      console.error('Middleware: Failed to create Supabase client:', error);
      return response;
    }

    // Refresh session if expired - required for Server Components
    let user = null;
    try {
      await supabase.auth.getSession();
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      user = authUser;
    } catch (error) {
      // If Supabase fails, continue without auth
      console.error('Middleware auth error:', error);
    }

    // Protected routes
    const protectedRoutes = ['/dashboard', '/onboarding'];
    const isProtectedRoute = protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    );

    // Admin routes
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    const isAdminLogin = request.nextUrl.pathname === '/admin/login';

    // Allow demo mode for dashboard - check query param or cookie
    const isDemoModeParam = request.nextUrl.searchParams.get('demo') === 'true';
    const isDemoModeCookie = request.cookies.get('demo_mode')?.value === 'true';
    const isDemoMode = isDemoModeParam || isDemoModeCookie;

    // If demo mode param is present, set the cookie
    if (isDemoModeParam && !isDemoModeCookie) {
      response.cookies.set('demo_mode', 'true', {
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
        sameSite: 'lax',
        httpOnly: false, // Allow JavaScript access
      });
    }

    // Redirect logic
    if (isProtectedRoute && !user && !isDemoMode) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Admin routes require authentication
    if (isAdminRoute && !isAdminLogin && !user) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // If admin is logged in and tries to access admin login, redirect to admin dashboard
    if (user && isAdminLogin) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    // If user is logged in and tries to access login/signup, redirect to dashboard
    if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname.startsWith('/signup'))) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return response;
  } catch (error) {
    // If anything fails in middleware, allow the request to proceed
    // This ensures the site never crashes due to middleware errors
    console.error('Middleware error:', error);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
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


