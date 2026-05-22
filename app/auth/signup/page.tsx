'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth-context';
import { authService } from '@/services';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    const { data, error: apiError } = await authService.signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (data?.user) {
      // Backend has set the HTTP-only cookie.
      // We store the user object in React state only.
      setUser(data.user);
      router.push('/');
    } else {
      setError(apiError || 'Could not create account. Please try again.');
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Get Started</h1>
              <p className="text-muted-foreground">Create your AgriFresh account</p>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} required />
              <Input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required />
              <Input type="password" name="password" placeholder="Password (min 6 characters)" value={formData.password} onChange={handleChange} required />
              <Input type="password" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} required />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-primary hover:text-primary/80">Sign in</Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                By signing up, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
