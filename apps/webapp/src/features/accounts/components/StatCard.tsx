import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react';

type Props = {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
};

const StatCard: React.FC<Props> = ({ title, value, icon, trend }) => {
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

  return (
    <div className="flex items-center gap-3 px-4 py-3 min-w-[200px]">
      <div className="size-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          {title}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold text-gray-900">{formattedValue}</p>
          {trend && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 text-xs font-medium',
                trend.isPositive ? 'text-emerald-600' : 'text-red-500',
              )}
            >
              {trend.isPositive ? (
                <TrendingUp className="size-3" />
              ) : (
                <TrendingDown className="size-3" />
              )}
              {trend.value}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
