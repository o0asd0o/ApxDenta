import { requestPasswordReset } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type ForgotPasswordFormType,
  forgotPasswordSchema,
} from '@repo/schemas';
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
              Check Your Email
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              We've sent a password reset link to your email address
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
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsSubmitted(false);
                    setSubmittedEmail('');
                    form.reset();
                  }}
                >
                  Try Again
                </Button>
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
          <CardTitle className="text-lg md:text-xl">Forgot Password</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email address and we'll send you a link to reset your
            password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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

              <Button type="submit" className="w-full" isLoading={isPending}>
                Send Reset Link
              </Button>
            </form>
          </Form>

          <div
            className={cn(
              'w-full gap-2 flex items-center',
              'justify-between flex-col',
            )}
          >
            <span className="text-sm text-gray-500 mt-2">
              Remember your password?{' '}
              <Link
                to="/login"
                className="text-primary/70 underline hover:text-primary"
              >
                Sign in here
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
