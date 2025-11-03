import { requestPasswordReset } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type ForgotPasswordFormType,
  forgotPasswordSchema,
} from '@repo/schemas';
import {
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@repo/ui/components';
import { useMutation } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const ForgotPasswordForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const { mutate: resetPassword, isPending } = useMutation<
    void,
    Error,
    ForgotPasswordFormType
  >({
    mutationFn: async ({ email }) => {
      const redirectTo = `${import.meta.env.VITE_PUBLIC_WEB_URL}/reset-password`;
      await requestPasswordReset({ email, redirectTo });
    },
    onError: (error) => {
      toast.error(`Error requesting password reset: ${JSON.stringify(error)}`);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
    },
  });

  const onSubmit = (values: ForgotPasswordFormType) => {
    const email = values.email.trim();
    setSubmittedEmail(email);
    resetPassword({ email });
  };

  if (isSubmitted) {
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
            <h2 className="text-sm font-normal mb-4 opacity-90">
              Secure and reliable
            </h2>
            <h1 className="text-4xl font-bold leading-tight">
              Password recovery
              <br />
              made simple for your
              <br />
              peace of mind
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
                Check Your Email
              </h1>
              <p className="text-gray-600 text-sm">
                We've sent a password reset link to your email address to help
                you regain access to your dental clinic management account.
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
                        <title>Email sent successfully</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">
                      If an account with email <strong>{submittedEmail}</strong>{' '}
                      exists, you will receive a password reset link shortly.
                    </p>
                    <p className="text-xs text-gray-500">
                      Didn't receive the email? Check your spam folder or try
                      again.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="w-full h-12"
                      onClick={() => {
                        setIsSubmitted(false);
                        setSubmittedEmail('');
                        form.reset();
                      }}
                    >
                      Try Again
                    </Button>
                    <div className="text-center">
                      <Link
                        to="/login"
                        className="text-sm text-blue-600 font-medium hover:text-blue-700"
                      >
                        Back to Login
                      </Link>
                    </div>
                  </div>
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
      <div className="hidden lg:flex lg:w-1/2 bg-[url('/images/svg/blurry-gradient-1.svg')] bg-cover relative overflow-hidden">
        <div className="flex flex-col justify-center px-16 text-white">
          <h2 className="text-sm font-normal mb-4 opacity-90">
            Secure and reliable
          </h2>
          <h1 className="text-4xl font-bold leading-tight">
            Password recovery
            <br />
            made simple for your
            <br />
            peace of mind
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
              Forgot Password
            </h1>
            <p className="text-gray-600 text-sm">
              Enter your email address and we'll send you a secure link to reset
              your password and regain access to your clinic management account.
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Your email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email address"
                            className="h-12 border-gray-200 bg-gray-50 focus:bg-white [&>input]:h-full"
                            autoComplete="email"
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
                  >
                    Send Reset Link
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
