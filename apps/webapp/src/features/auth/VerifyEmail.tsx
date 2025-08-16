import { verifyEmail } from '@/lib/auth-client';
import { Route } from '@/routes/(auth)/verify-email';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components';
import { useMutation } from '@tanstack/react-query';
import { Link, useRouter } from '@tanstack/react-router';
import type React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const VerifyEmailPage: React.FC = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  const router = useRouter();
  const { token } = Route.useSearch();

  useEffect(() => {
    if (!token) {
      setTokenError(true);
    }
  }, [token]);

  const { mutate: handleVerifyEmail } = useMutation<
    void,
    Error,
    { token: string }
  >({
    mutationFn: async ({ token }) => {
      await verifyEmail({ query: { token } });
    },
    onError: (error) => {
      toast.error(`Error verifying email: ${error.message}`);
      setTokenError(true);
    },
    onSuccess: () => {
      setIsVerified(true);
      toast.success('Email verified successfully!');
      setTimeout(() => {
        router.navigate({ to: '/login' });
      }, 3000);
    },
  });

  useEffect(() => {
    if (token && !isVerified && !tokenError) {
      handleVerifyEmail({ token });
    }
  }, [token, isVerified, tokenError, handleVerifyEmail]);

  if (tokenError) {
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
              Invalid Verification Link
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              This email verification link is invalid or has expired
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
                  The email verification link you used is either invalid or has
                  expired.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Link to="/login">
                  <Button className="w-full">Back to Login</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isVerified) {
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
              Email Verified
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Your email has been successfully verified
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
                    <title>Email verified successfully</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Your email has been verified. You can now sign in to your
                  account.
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

  // Loading state
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
          <CardTitle className="text-lg md:text-xl">
            Verifying Email...
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Please wait while we verify your email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-blue-600 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-label="Loading icon"
                >
                  <title>Loading</title>
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    strokeWidth="4"
                    strokeDasharray="32"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600">
                We are verifying your email. This should only take a moment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
