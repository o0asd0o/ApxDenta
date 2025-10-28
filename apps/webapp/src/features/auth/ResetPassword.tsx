import { resetPassword } from '@/lib/auth-client';
import { Route } from '@/routes/(auth)/reset-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ResetPasswordFormType, resetPasswordSchema } from '@repo/schemas';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@repo/ui/components';
import { useMutation } from '@tanstack/react-query';
import { Link, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const ResetPasswordForm = () => {
  const [isCompleted, setIsCompleted] = useState(false);

  const router = useRouter();
  const { token } = Route.useSearch();

  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onChange',
  });

  const { mutate: handleResetPassword, isPending } = useMutation<
    void,
    Error,
    { password: string; token: string }
  >({
    mutationFn: async ({ password, token }) => {
      await resetPassword({ newPassword: password, token });
    },
    onError: (error) => {
      toast.error(error?.message ?? 'Error resetting password');
    },
    onSuccess: () => {
      setIsCompleted(true);
      toast.success('Password reset successfully!');
      setTimeout(() => router.navigate({ to: '/login' }), 3000);
    },
  });

  const onSubmit = (values: ResetPasswordFormType) => {
    if (!token) {
      toast.error('Invalid or missing reset token');
      return;
    }

    handleResetPassword({ password: values.password.trim(), token });
  };

  // Success state
  if (isCompleted) {
    return (
      <div className="flex h-dvh bg-gray-50">
        {/* Left Panel - Gradient Background */}
        <div className="hidden lg:flex lg:w-1/2 bg-[url('/images/svg/blurry-gradient-3.svg')] bg-cover relative overflow-hidden">
          <div className="absolute top-8 left-8">
            <img
              className="w-7 h-7 brightness-0 invert"
              src="/images/apxdenta-logo.png"
              alt="ApxDenta Logo"
            />
          </div>
          <div className="flex flex-col justify-center px-16 text-white">
            <h2 className="text-sm font-normal mb-4 opacity-90">All set!</h2>
            <h1 className="text-4xl font-bold leading-tight">
              Your password has
              <br />
              been successfully
              <br />
              updated
            </h1>
          </div>
        </div>

        {/* Right Panel - Success Message */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16">
          <div className="max-w-md w-full mx-auto">
            {/* Logo for mobile */}
            <div className="flex items-center justify-center mb-8 lg:hidden gap-2">
              <img
                className="w-[40px]"
                src="/images/apxdenta-logo.png"
                alt="ApxDenta Logo"
              />
              <img
                className="w-[140px]"
                src="/images/apx-denta-string-only.png"
                alt="ApxDenta Logo Text"
              />
            </div>

            {/* ApxDenta brand symbol */}
            <div className="hidden lg:block mb-8">
              <img
                className="w-8 h-8"
                src="/images/apxdenta-logo.png"
                alt="ApxDenta Logo"
              />
            </div>

            <div className="mb-8">
              <h1 className="text-2xl font-bold text-green-600 mb-2">
                Password Reset Complete
              </h1>
              <p className="text-gray-600 text-sm">
                Your password has been successfully reset. You can now sign in
                with your new password and continue managing your dental clinic.
              </p>
            </div>

            <Card className="border-0 shadow-none p-0">
              <CardContent className="p-0">
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-label="Success checkmark"
                      >
                        <title>Password reset successfully</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your password has been successfully updated. You can now
                      sign in with your new password.
                    </p>
                    <p className="text-xs text-gray-500">
                      You will be automatically redirected to the login page in
                      a few seconds.
                    </p>
                  </div>

                  <Link to="/login">
                    <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">
                      Continue to Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-dvh bg-gray-50">
      {/* Left Panel - Gradient Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-[url('/images/svg/blurry-gradient.svg')] bg-cover relative overflow-hidden">
        <div className="absolute top-8 left-8">
          <img
            className="w-7 h-7 brightness-0 invert"
            src="/images/apxdenta-logo.png"
            alt="ApxDenta Logo"
          />
        </div>
        <div className="flex flex-col justify-center px-16 text-white">
          <h2 className="text-sm font-normal mb-4 opacity-90">Almost there</h2>
          <h1 className="text-4xl font-bold leading-tight">
            Set your new
            <br />
            password and regain
            <br />
            full access
          </h1>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16">
        <div className="max-w-md w-full mx-auto">
          {/* Logo for mobile */}
          <div className="flex items-center justify-center mb-8 lg:hidden gap-2">
            <img
              className="w-[40px]"
              src="/images/apxdenta-logo.png"
              alt="ApxDenta Logo"
            />
            <img
              className="w-[140px]"
              src="/images/apx-denta-string-only.png"
              alt="ApxDenta Logo Text"
            />
          </div>

          {/* ApxDenta brand symbol */}
          <div className="hidden lg:block mb-8">
            <img
              className="w-8 h-8"
              src="/images/apxdenta-logo.png"
              alt="ApxDenta Logo"
            />
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Reset Password
            </h1>
            <p className="text-gray-600 text-sm">
              Enter your new password to complete the reset process and regain
              access to your dental clinic management account.
            </p>
          </div>

          <Card className="border-0 shadow-none p-0">
            <CardContent className="p-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          New Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Enter new password"
                            className="h-12 border-gray-200 bg-gray-50 focus:bg-white [&>input]:h-full"
                            autoComplete="new-password"
                          />
                        </FormControl>
                        <p className="text-xs text-gray-500">
                          Password must be at least 8 characters long
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Confirm New Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Confirm new password"
                            className="h-12 border-gray-200 bg-gray-50 focus:bg-white [&>input]:h-full"
                            autoComplete="new-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                    isLoading={isPending}
                    disabled={!form.formState.isValid || isPending}
                  >
                    Reset Password
                  </Button>

                  <div className="text-center">
                    <span className="text-sm text-gray-600">
                      Remember your password?{' '}
                      <Link
                        to="/login"
                        className="text-blue-600 font-medium hover:text-blue-700"
                      >
                        Sign in here
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

export const ResetPasswordError = () => {
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
          <CardTitle className="text-lg md:text-xl text-red-600">
            Invalid Reset Link
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            This password reset link is invalid or has expired
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Error icon"
                >
                  <title>Invalid token error</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600">
                The password reset link you used is either invalid or has
                expired. Please request a new password reset link.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Link to="/forgot-password">
                <Button className="w-full">Request New Reset Link</Button>
              </Link>
              <Link
                to="/login"
                className="text-center text-sm text-primary/70 underline hover:text-primary"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
