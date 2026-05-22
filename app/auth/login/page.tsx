'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth-context';
import { authService } from '@/services';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const redirectTo = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    const { data, error: apiError } = await authService.login({ email, password });

    if (data?.user) {
      // Backend has set the HTTP-only cookie.
      // We store the user object in React state only.
      setUser(data.user);
      router.push(redirectTo);
    } else {
      setError(apiError || 'Invalid email or password');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="bg-card rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to your AgriFresh account</p>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/auth/signup" className="text-primary hover:text-primary/80">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <Link href="/">
                <Button variant="outline" className="w-full">Continue as Guest</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
