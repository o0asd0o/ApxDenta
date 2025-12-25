import { Route } from '@/routes/(auth)/verification-sent';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@repo/ui/components';
import React from 'react';
import { toast } from 'sonner';

const EmailVerificationSent: React.FC = () => {
  const { email } = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh py-8 overflow-y-auto bg-white xs:bg-card">
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
      <Card className="max-w-md w-full bg-white border-none shadow-none xs:border xs:shadow-sm">
        <CardContent className="flex flex-col items-center px-8 py-10 pb-0">
          <img
            src="/images/svg/email-verification-sent.svg"
            alt="Email Confirmation"
            className="w-22 h-22 mb-4"
          />
          <CardTitle className="text-xl font-bold mb-2 text-center">
            Email Confirmation
          </CardTitle>
          <CardDescription className="text-sm text-center text-gray-700 mb-6">
            We have sent an email to{' '}
            <span className="text-primary font-medium">{email}</span> to confirm
            the validity of your email address.
          </CardDescription>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate({ to: '/login' })}
          >
            Back to login
          </Button>
          <hr className="w-full my-4 border-t border-gray-300" />
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
