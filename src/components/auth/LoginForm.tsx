import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted', { email, isSignUp });
    
    // Only allow specific email
    if (email !== 'jaydenf3800@gmail.com') {
      toast.error('Access denied. Only authorized users can access.');
      return;
    }

    if (!password) {
      toast.error('Password is required');
      return;
    }

    setIsLoading(true);
    
    try {
      const redirectUrl = window.location.origin;
      
      if (isSignUp) {
        console.log('Attempting signup');
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              email: email
            }
          }
        });

        console.log('Signup response:', { data, error });

        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('Account already exists. Please use login instead.');
            setIsSignUp(false);
          } else if (error.message.includes('Email not confirmed')) {
            toast.error('Please check your email and confirm your account first.');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Account created! Check your email to verify.', {
            duration: 6000
          });
        }
      } else {
        console.log('Attempting login');
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        console.log('Login response:', { data, error });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password. If you just signed up, please verify your email first.');
          } else if (error.message.includes('Email not confirmed')) {
            toast.error('Please verify your email before logging in. Check your inbox.');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Login successful!');
          navigate('/house-tracking');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      toast.error('Please enter your email address first');
      return;
    }
    
    if (email !== 'jaydenf3800@gmail.com') {
      toast.error('Access denied. Only authorized users can access.');
      return;
    }

    setIsLoading(true);
    try {
      const redirectUrl = window.location.origin;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl
      });

      if (error) {
        if (error.message.includes('rate limit')) {
          toast.error('Please wait a minute before requesting another reset email.');
        } else {
          toast.error(`Reset failed: ${error.message}`);
        }
      } else {
        toast.success('Password reset email sent! Check your email (including spam folder) and click the link.', {
          duration: 8000
        });
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {isSignUp ? 'Sign Up for House Tracking' : 'Login to House Tracking'}
          </CardTitle>
          <p className="text-sm text-center text-muted-foreground mt-2">
            Access restricted to authorized users only
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading 
                ? (isSignUp ? 'Creating Account...' : 'Logging in...') 
                : (isSignUp ? 'Sign Up' : 'Login')
              }
            </Button>
            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:underline block"
              >
                {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
              </button>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  className="text-gray-600 hover:underline text-sm block"
                >
                  Forgot your password?
                </button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;