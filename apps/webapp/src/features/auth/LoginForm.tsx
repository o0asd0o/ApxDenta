import { GoogleSVG } from '@/assets/google';
import { signIn } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { Route } from '@/routes/(auth)/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginFormType, loginSchema } from '@repo/schemas';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
} from '@repo/ui/components';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import type React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false },
  });

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const response = await signIn.email(payload);
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      const dest = redirect
        ? `${import.meta.env.VITE_PUBLIC_WEB_URL}${redirect}`
        : '/dashboard';
      navigate({ to: dest });
    },
  });

  const { mutate: loginSocial, isPending: isPendingSocial } = useMutation({
    mutationFn: async () => {
      let callbackUrl: undefined | string;
      if (redirect) {
        callbackUrl = `${import.meta.env.VITE_PUBLIC_WEB_URL}${redirect}`;
      }

      const response = await signIn.social({
        provider: 'google',
        callbackURL:
          callbackUrl || `${import.meta.env.VITE_PUBLIC_WEB_URL}/dashboard`,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-white xs:bg-card">
      <div className="flex items-center justify-center mb-6 gap-2">
        <img
          className="w-[40px]  xs:w-[50px] xs:mt-[-5px]"
          src="/images/apxdenta-logo.png"
          alt="ApxDenta Logo"
        />
        <img
          className="w-[140px] xs:w-[160px]"
          src="/images/apx-denta-string-only.png"
          alt="ApxDenta Logo Text"
        />
      </div>
      <Card className="max-w-md w-full bg-white border-none shadow-none xs:border xs:shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) =>
                loginUser({
                  email: values.email,
                  password: values.password,
                }),
              )}
              className="grid gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          className="mb-0"
                          checked={!!field.value}
                          onCheckedChange={(val) => field.onChange(!!val)}
                          id="remember"
                        />
                      </FormControl>
                      <Label htmlFor="remember">Remember me</Label>
                    </FormItem>
                  )}
                />

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
                isLoading={isPending}
                disabled={isPendingSocial}
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
                  disabled={isPending}
                  isLoading={isPendingSocial}
                  onClick={() => loginSocial()}
                >
                  <GoogleSVG />
                  Sign in with Google
                </Button>
                <span className="text-sm text-gray-500 mt-2">
                  Don't have an account yet?{' '}
                  <Link
                    to="/register"
                    className="text-primary/70 underline hover:text-primary"
                  >
                    Register here
                  </Link>
                </span>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
