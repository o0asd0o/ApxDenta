import { resetPassword } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { Route } from '@/routes/(auth)/reset-password';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@repo/ui/components';
import { useMutation } from '@tanstack/react-query';
import { Link, useRouter } from '@tanstack/react-router';
import type React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const ResetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  const router = useRouter();
  const { token } = Route.useSearch();

  // Check if token exists
  useEffect(() => {
    if (!token) {
      setTokenError(true);
    }
  }, [token]);

  const { mutate: handleResetPassword, isPending } = useMutation<
    void,
    Error,
    { password: string; token: string }
  >({
    mutationFn: async ({ password, token }) => {
      await resetPassword({ newPassword: password, token });
    },
    onError: (error) => {
      toast.error(`Error resetting password: ${JSON.stringify(error)}`);
    },
    onSuccess: () => {
      setIsCompleted(true);
      toast.success('Password reset successfully!');
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.navigate({ to: '/login' });
      }, 3000);
    },
  });

  const handleSubmit = () => {
    if (!token) {
      toast.error('Invalid or missing reset token');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    handleResetPassword({ password: password.trim(), token });
  };

  // Token error state
  if (tokenError) {
    return (
      <div className="flex flex-col items-center justify-center h-dvh">
        <div className="flex flex-col items-center mb-6">
          <img
            className="w-[160px]"
            src="/images/apx-denta-banner-vertical.png"
            alt="ApxDenta Logo"
          />
        </div>
        <Card className="max-w-md w-full">
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
  }

  // Success state
  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center h-dvh">
        <div className="flex flex-col items-center mb-6">
          <img
            className="w-[160px]"
            src="/images/apx-denta-banner-vertical.png"
            alt="ApxDenta Logo"
          />
        </div>
        <Card className="max-w-md w-full">
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
    <div className="flex flex-col items-center justify-center h-dvh">
      <div className="flex flex-col items-center mb-6">
        <img
          className="w-[160px]"
          src="/images/apx-denta-banner-vertical.png"
          alt="ApxDenta Logo"
        />
      </div>
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Reset Password</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your new password to complete the reset process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                required
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
              />
              <p className="text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                required
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setConfirmPassword(e.target.value);
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSubmit();
                  }
                }}
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500">Passwords do not match</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isPending}
              disabled={
                !password.trim() ||
                !confirmPassword.trim() ||
                password !== confirmPassword ||
                password.length < 8
              }
              onClick={handleSubmit}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
