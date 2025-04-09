import { GoogleSVG } from '@/assets/google';
import { signIn } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
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
import type React from 'react';
import { useState } from 'react';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex items-center justify-center h-dvh">
      <Card className="max-w-md w-[500px]">
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
                onChange={(e) => {
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
                onChange={(e) => setPassword(e.target.value)}
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
              <a
                href="sample#"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={loading}
              onClick={async () => {
                await signIn.email(
                  { email, password },
                  {
                    onRequest: (ctx) => {
                      setLoading(true);
                    },
                    onResponse: (ctx) => {
                      setLoading(false);
                    },
                  },
                );
              }}
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
                onClick={async () => {
                  await signIn.social(
                    {
                      provider: 'google',
                      callbackURL: '/dashboard',
                    },
                    {
                      onRequest: (ctx) => {
                        setLoading(true);
                      },
                      onResponse: (ctx) => {
                        setLoading(false);
                      },
                    },
                  );
                }}
              >
                <GoogleSVG />
                Sign in with Google
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
