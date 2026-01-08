'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function LoginPage() {
  const router = useRouter();

  const handleDemoLogin = () => {
    // Store demo session
    localStorage.setItem('demo-user', 'true');
    localStorage.setItem('demo-email', 'demo@transitionmarketingai.com');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Sign In</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <Button className="w-full">
                  Sign In
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or try the demo
                    </span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleDemoLogin}
                >
                  🚀 Try Demo Dashboard
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </div>
                <div className="text-center text-xs text-muted-foreground bg-muted p-3 rounded">
                  <strong>Demo:</strong> Experience all 5 AI agents with realistic data and interactive features.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
