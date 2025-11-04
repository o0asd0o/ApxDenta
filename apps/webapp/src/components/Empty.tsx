import { CircleOff } from 'lucide-react';
import React from 'react';

const Empty: React.FC = () => {
  return (
    <div className="p-2 text-center text-sm text-gray-600 flex flex-col gap-2 items-center justify-center">
      <CircleOff className="inline-block size-6 text-gray-200" />
      <span>No data available</span>
    </div>
  );
};

export default Empty;
