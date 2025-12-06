import { Calendar } from 'lucide-react';
import React from 'react';

type Props = {
  date: Date;
  type: 'short' | 'long' | 'medium' | 'full';
  includeTime?: boolean;
};

const DateDisplay: React.FC<Props> = ({ date, type, includeTime }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Calendar className="size-4 text-muted-foreground" />
      {Intl.DateTimeFormat('en-US', {
        dateStyle: type,
        ...(includeTime && { timeStyle: 'short' }),
      }).format(date)}
    </div>
  );
};

export default DateDisplay;
