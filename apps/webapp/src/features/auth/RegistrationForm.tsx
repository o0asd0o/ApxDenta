import { signUp } from '@/lib/auth-client';
import { useTRPCClient } from '@/lib/trpc';
import { Route } from '@/routes/(auth)/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { type RegistrationFormType, registrationSchema } from '@repo/schemas';
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
import { Link, useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import type React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const DEFAULT_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

export const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();

  const { staffId, invitationId } = Route.useSearch();

  const trpc = useTRPCClient();

  const form = useForm<RegistrationFormType>({
    resolver: zodResolver(registrationSchema),
    defaultValues: async () => {
      if (staffId && invitationId) {
        const staff = await trpc.staffs.getInvitedStaff.query({
          id: staffId as string,
        });

        return {
          ...DEFAULT_VALUES,
          firstName: staff?.data.firstName || '',
          lastName: staff?.data.lastName || '',
          email: staff?.data.email || '',
        };
      }

      return DEFAULT_VALUES;
    },
  });

  const { mutate: registerAccount, isPending } = useMutation({
    mutationFn: async (values: RegistrationFormType) => {
      const response = await signUp.email({
        email: values.email,
        password: values.password,
        name: `${values.firstName} ${values.lastName}`,
        callbackURL: '/verification-sent',
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (staffId && invitationId) {
        await trpc.staffs.tieStaffToAccount.mutate({
          userId: response.data.user.id,
          staffId,
          invitationId,
        });
      }

      navigate({ to: '/verification-sent', search: { email: values.email } });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Something went wrong');
    },
  });

  return (
    <div className="flex min-h-dvh bg-gray-50">
      {/* Left Panel - Gradient Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-[url('/images/svg/blurry-gradient-2.svg')] bg-cover relative overflow-hidden">
        <div className="flex flex-col justify-center px-16 text-white">
          <h2 className="text-sm font-normal mb-4 opacity-90">
            Join thousands of clinics
          </h2>
          <h1 className="text-4xl font-semibold leading-tight">
            Transform your dental
            <br />
            clinic with modern
            <br />
            technology
          </h1>
        </div>
      </div>

      {/* Right Panel - Form */}
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
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Create your account
            </h1>
            <p className="text-gray-600 text-sm">
              Start managing your dental clinic more efficiently - create your
              account to access comprehensive patient and treatment management
              tools.
            </p>
          </div>

          <Card className="border-0 shadow-none p-0 bg-[--card]">
            <CardContent className="p-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((values) =>
                    registerAccount(values),
                  )}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            First name
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={!!staffId}
                              {...field}
                              placeholder="John"
                              className="h-12 border-gray-300 bg-gray-50 focus:bg-white [&>input]:h-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Last name
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={!!staffId}
                              {...field}
                              placeholder="Doe"
                              className="h-12 border-gray-300 bg-gray-50 focus:bg-white [&>input]:h-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
                            disabled={!!staffId}
                            {...field}
                            type="email"
                            placeholder="john.doe@example.com"
                            className="h-12 border-gray-300 bg-gray-50 focus:bg-white [&>input]:h-full"
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
                            autoComplete="new-password"
                            placeholder="••••••••••"
                            className="h-12 border-gray-300 bg-gray-50 focus:bg-white [&>input]:h-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passwordConfirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            autoComplete="new-password"
                            placeholder="••••••••••"
                            className="h-12 border-gray-300 bg-gray-50 focus:bg-white [&>input]:h-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      'Create Account'
                    )}
                  </Button>

                  <div className="text-center">
                    <span className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <Link
                        to="/login"
                        className="text-blue-600 font-medium hover:text-blue-700"
                      >
                        Sign in
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

export default RegistrationForm;
