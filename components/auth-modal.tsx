'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (email: string, password: string) => Promise<void>;
}

export default function AuthModal({ isOpen, onOpenChange, onLogin }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await onLogin(email, password);
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass border-white/20">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Welcome Back</DialogTitle>
          <DialogDescription className="text-gray-600">
            Sign in to access your presentation history and generate new slides
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-800 font-semibold">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="bg-white/80 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-800 font-semibold">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="bg-white/80 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:shadow-lg text-white font-semibold rounded-xl h-11 transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>

          <p className="text-xs text-gray-600 text-center">
            Demo: Use any email and password to sign in
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
