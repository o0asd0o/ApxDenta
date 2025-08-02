import { GoogleSVG } from '@/assets/google';
import { signIn } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { Route } from '@/routes/(auth)/login';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
} from '@repo/ui/components';
import { Link } from '@tanstack/react-router';
import type React from 'react';
import { useState } from 'react';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSocial, setLoadingSocial] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { redirect } = Route.useSearch();

  const loginUser = async () => {
    await signIn.email(
      { email, password },
      {
        onRequest: (_) => setLoading(true),
        onResponse: (_) => setLoading(false),
      },
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <div className="flex items-center justify-center mb-6 gap-2">
        <img
          className="w-[50px] mt-[-5px]"
          src="/images/apxdenta-logo.png"
          alt="ApxDenta Logo"
        />
        <img
          className="w-[160px]"
          src="/images/apx-denta-string-only.png"
          alt="ApxDenta Logo Text"
        />
      </div>
      <Card className="max-w-md w-full bg-white">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>

              <Input
                id="password"
                type="password"
                placeholder="password"
                autoComplete="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();

                    loginUser();
                  }
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                onClick={() => {
                  setRememberMe(!rememberMe);
                }}
              />
              <Label htmlFor="remember">Remember me</Label>
              <Link
                to="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full"
              isLoading={loading}
              disabled={loadingSocial}
              onClick={async () => loginUser()}
            >
              Login
            </Button>
            <div
              className={cn(
                'w-full gap-2 flex items-center',
                'justify-between flex-col',
              )}
            >
              <Button
                variant="outline"
                className={cn('w-full gap-2')}
                disabled={loading}
                isLoading={loadingSocial}
                onClick={async () => {
                  let callbackUrl: undefined | string;
                  if (redirect) {
                    callbackUrl = `${import.meta.env.VITE_PUBLIC_WEB_URL}${redirect}`;
                  }

                  await signIn.social(
                    {
                      provider: 'google',
                      callbackURL:
                        callbackUrl ||
                        `${import.meta.env.VITE_PUBLIC_WEB_URL}/dashboard`,
                    },
                    {
                      onRequest: (_) => setLoadingSocial(true),
                      onResponse: (_) => setLoadingSocial(false),
                    },
                  );
                }}
              >
                <GoogleSVG />
                Sign in with Google
              </Button>
              <span className="text-xs text-gray-500 mt-2">
                Don't have an account yet?{' '}
                <Link
                  to="/register"
                  className="text-primary/70 underline hover:text-primary"
                >
                  Register here
                </Link>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
