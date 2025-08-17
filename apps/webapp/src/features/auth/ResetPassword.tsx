import { resetPassword } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
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
            <CardTitle className="text-lg md:text-xl text-green-600">
              Password Reset Complete
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Your password has been successfully reset
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
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
                  Your password has been successfully updated. You can now sign
                  in with your new password.
                </p>
                <p className="text-xs text-gray-500">
                  You will be automatically redirected to the login page in a
                  few seconds.
                </p>
              </div>

              <Link to="/login">
                <Button className="w-full">Continue to Login</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main reset password form
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
          <CardTitle className="text-lg md:text-xl">Reset Password</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your new password to complete the reset process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="Enter new password"
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
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                isLoading={isPending}
                disabled={!form.formState.isValid || isPending}
              >
                Reset Password
              </Button>

              <div className={cn('w-full flex items-center justify-center')}>
                <span className="text-xs text-gray-500">
                  Remember your password?{' '}
                  <Link
                    to="/login"
                    className="text-primary/70 underline hover:text-primary"
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
