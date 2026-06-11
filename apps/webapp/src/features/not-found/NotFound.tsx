import { Button, Card, CardContent } from '@repo/ui/components';
import { Link } from '@tanstack/react-router';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white xs:bg-card px-4 py-16">
      <Card className="shadow-none max-w-md w-full border-none xs:border">
        <CardContent>
          <div className="flex flex-col items-center gap-6 p-6">
            <div className="w-20 h-20 p-5 rounded-full bg-primary/5 flex items-center justify-center">
              <img src="/images/svg/broken-link-chain.svg" alt="Broken link" />
            </div>

            <h1 className="text-4xl font-semibold text-gray-900">404</h1>
            <h2 className="text-base text-gray-700">Page not found</h2>

            <p className="text-sm text-gray-500 text-center">
              Sorry — we couldn't find the page you were looking for. Try
              returning home or signing in.
            </p>

            <div className="w-full flex flex-row gap-3 mt-4 items-center justify-center">
              <Link to="/">
                <Button className="w-full">Home</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
