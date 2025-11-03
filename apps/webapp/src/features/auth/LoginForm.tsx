import { GoogleSVG } from '@/assets/google';
import { signIn, useSession } from '@/lib/auth-client';
import { Route } from '@/routes/(auth)/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginFormType, loginSchema } from '@repo/schemas';
import {
  Button,
  Card,
  CardContent,
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

  const { refetch } = useSession();

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
      await refetch();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      setTimeout(() => navigate({ to: redirect || '/dashboard' }), 100);
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
        errorCallbackURL: '/auth/error',
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
    <div className="flex h-dvh bg-gray-50">
      {/* Left Panel - Gradient Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-[url('/images/svg/blurry-gradient.svg')] bg-cover relative overflow-hidden">
        <div className="flex flex-col justify-center px-16 text-white">
          <h2 className="text-sm font-normal mb-4 opacity-90">
            You can easily
          </h2>
          <h1 className="text-4xl font-bold leading-tight">
            Manage your dental
            <br />
            clinic with complete
            <br />
            efficiency
          </h1>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16">
        <div className="max-w-md w-full mx-auto">
          {/* Logo for mobile */}
          <div className="flex items-center justify-center mb-8 lg:hidden gap-2">
            <img
              className="w-[35px]"
              src="/images/apxdenta-logo.png"
              alt="ApxDenta Logo"
            />
            <img
              className="w-[120px]"
              src="/images/apx-denta-string-only.png"
              alt="ApxDenta Logo Text"
            />
          </div>

          {/* ApxDenta brand symbol */}
          <div className="hidden lg:block mb-8">
            <img
              className="w-7 h-7"
              src="/images/apxdenta-logo.png"
              alt="ApxDenta Logo"
            />
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Login to your account
            </h1>
            <p className="text-gray-600 text-sm">
              Manage patients, appointments, and treatments seamlessly -
              streamline your dental clinic operations in one unified platform.
            </p>
          </div>

          <Card className="border-0 shadow-none p-0">
            <CardContent className="p-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((values) =>
                    loginUser({
                      email: values.email,
                      password: values.password,
                    }),
                  )}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="me@gmail.com"
                            className="h-12 border-gray-200 bg-gray-50 focus:bg-white [&>input]:h-full"
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
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="••••••••••"
                            className="h-12 border-gray-200 bg-gray-50 focus:bg-white [&>input]:h-full"
                            autoComplete="current-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                      isLoading={isPending}
                      disabled={isPendingSocial}
                    >
                      Login
                    </Button>
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
                            <Label className="text-xs" htmlFor="remember">
                              Remember me
                            </Label>
                          </FormItem>
                        )}
                      />

                      <Link
                        to="/forgot-password"
                        className="ml-auto inline-block text-xs underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 text-gray-500 bg-card">or</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 border-gray-200 bg-gray-50 hover:bg-gray-100 gap-2"
                    disabled={isPending}
                    isLoading={isPendingSocial}
                    onClick={() => loginSocial()}
                  >
                    <GoogleSVG />
                    Sign in with Google
                  </Button>

                  <div className="text-center">
                    <span className="text-sm text-gray-600">
                      Don't have an account?{' '}
                      <Link
                        to="/register"
                        className="text-blue-600 font-medium hover:text-blue-700"
                      >
                        Sign up
                      </Link>
                    </span>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
