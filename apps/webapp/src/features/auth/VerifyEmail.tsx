import { Route } from '@/routes/(auth)/verify-email';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components';
import { Link } from '@tanstack/react-router';
import type React from 'react';
import { useEffect } from 'react';

export const VerifyEmailPage: React.FC = () => {
  const isVerified = Route.useLoaderData();

  const navigate = Route.useNavigate();

  useEffect(() => {
    setTimeout(() => navigate({ to: '/login' }), 3000);
  }, [navigate]);

  if (isVerified) {
    return (
      <div className="flex min-h-dvh bg-gray-50">
        {/* Left Panel - Gradient Background */}
        <div className="hidden lg:flex lg:w-1/2 bg-[url('/images/svg/blurry-gradient-4.svg')] bg-cover relative overflow-hidden">
          <div className="absolute top-8 left-8">
            <img
              className="w-7 h-7 brightness-0 invert"
              src="/images/apxdenta-logo.png"
              alt="ApxDenta Logo"
            />
          </div>
          <div className="flex flex-col justify-center px-16 text-white">
            <h2 className="text-sm font-normal mb-4 opacity-90">
              Welcome aboard!
            </h2>
            <h1 className="text-4xl font-semibold leading-tight">
              Your email is
              <br />
              verified and ready
              <br />
              to go
            </h1>
          </div>
        </div>

        {/* Right Panel - Success Message */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-8 overflow-y-auto">
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
              <h1 className="text-2xl font-semibold text-green-600 mb-2">
                Email Verified
              </h1>
              <p className="text-gray-600 text-sm">
                Your email has been successfully verified. You can now sign in
                to your dental clinic management account.
              </p>
            </div>

            <Card className="border-0 shadow-none p-0 bg-[--card]">
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

  return <VerifyEmailError />;
};

export const VeifyEmailPending: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh py-8 overflow-y-auto bg-white xs:bg-card">
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

export const VerifyEmailError: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh py-8 overflow-y-auto bg-white xs:bg-card">
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
};
