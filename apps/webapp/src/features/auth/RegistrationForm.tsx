import { signUp } from '@/lib/auth-client';
import { useTRPCClient } from '@/lib/trpc';
import { Route } from '@/routes/(auth)/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { type RegistrationFormType, registrationSchema } from '@repo/schemas';
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

  const { staffId } = Route.useSearch();

  const trpc = useTRPCClient();

  const form = useForm<RegistrationFormType>({
    resolver: zodResolver(registrationSchema),
    defaultValues: async () => {
      if (staffId) {
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

      if (staffId) {
        await trpc.staffs.tieStaffToAccount.mutate({
          userId: response.data.user.id,
          staffId,
        });
      }

      navigate({ to: '/verification-sent', search: { email: values.email } });
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
      <Card className="z-50 rounded-md rounded-t-none max-w-md w-full bg-white border-none shadow-none xs:border xs:shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => registerAccount(values))}
              className="grid gap-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={!!staffId}
                          {...field}
                          id="first-name"
                          placeholder="Max"
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
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={!!staffId}
                          {...field}
                          id="last-name"
                          placeholder="Robinson"
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!!staffId}
                        {...field}
                        id="email"
                        type="email"
                        placeholder="m@example.com"
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
                        autoComplete="new-password"
                        placeholder="Password"
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
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="password_confirmation"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirm Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  'Create an account'
                )}
              </Button>

              <div className="w-full flex justify-center-safe">
                <span className="text-sm text-gray-500 leading-3">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-primary/70 underline hover:text-primary"
                  >
                    Login here
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

export default RegistrationForm;
