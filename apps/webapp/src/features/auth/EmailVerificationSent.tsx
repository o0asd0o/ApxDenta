import { Route } from '@/routes/(auth)/verification-sent';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@repo/ui/components';
import { X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const EmailVerificationSent: React.FC = () => {
  const { email } = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-auth-bg">
      <div className="flex items-center justify-center mb-6 gap-2">
        <img
          className="w-[40px] xs:w-[50px] xs:mt-[-5px]"
          src="/images/apxdenta-logo.png"
          alt="ApxDenta Logo"
        />
        <img
          className="w-[140px] xs:w-[160px]"
          src="/images/apx-denta-string-only.png"
          alt="ApxDenta Logo Text"
        />
      </div>
      <Card className="relative max-w-lg w-full rounded-xl shadow-lg border-none xs:border xs:shadow-sm bg-white p-0">
        <button
          type="button"
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={() => navigate({ to: '/login' })}
        >
          <X size={24} />
        </button>
        <CardContent className="flex flex-col items-center px-8 py-10">
          <img
            src="/images/svg/email-verification-sent.svg"
            alt="Email Confirmation"
            className="w-28 h-28 mb-6"
          />
          <CardTitle className="text-2xl font-bold mb-2 text-center">
            Email Confirmation
          </CardTitle>
          <CardDescription className="text-base text-center text-gray-700 mb-6">
            We have sent an email to{' '}
            <span className="text-primary font-medium">{email}</span> to confirm
            the validity of your email address.
            <br />
            After receiving the email, follow the link provided to complete your
            registration.
          </CardDescription>
          <hr className="w-full my-4 border-t border-gray-200" />
          <div className="w-full text-center text-sm text-gray-500">
            If you did not get any mail
            <Button
              variant="outline"
              className="text-primary underline px-1 border-none bg-transparent hover:bg-transparent"
              type="button"
              onClick={() =>
                toast.info('Resend confirmation mail feature coming soon.')
              }
            >
              Resend confirmation mail
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerificationSent;
