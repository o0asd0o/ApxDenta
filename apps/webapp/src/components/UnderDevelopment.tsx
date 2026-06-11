import { UnderDevelopmentSVG } from '@/assets/under-development';
import React from 'react';

const UnderDevelopment: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh_-_6rem)] px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        <UnderDevelopmentSVG className="h-48 sm:h-64 md:h-80 lg:h-[400px] w-auto mx-auto mb-6 sm:mb-8" />
        <div className="text-center space-y-3 sm:space-y-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900">
            Under Development
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            This feature is currently under development. Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;
