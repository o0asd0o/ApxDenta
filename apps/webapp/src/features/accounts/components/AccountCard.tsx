import { cn } from '@/lib/utils';
import { Button, Card } from '@repo/ui/components';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';

export type AccountType = {
  id: string;
  name: string;
  balance: number;
  description?: string;
  accountNumber?: string;
  icon: React.ReactNode;
  iconBgColor: string;
  isActive: boolean;
};

type Props = {
  account: AccountType;
  onActivate?: (id: string) => void;
};

const AccountCard: React.FC<Props> = ({ account }) => {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(account.balance);

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'size-12 rounded-lg flex items-center justify-center',
              account.iconBgColor,
            )}
          >
            {account.icon}
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {account.name}
            </p>
            <p className="text-xl font-semibold text-gray-900">
              {formattedBalance}
            </p>
          </div>
        </div>
        {account.isActive ? (
          <button
            type="button"
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
          >
            <MoreHorizontal className="size-5 text-gray-400" />
          </button>
        ) : (
          <Button
            variant="outline"
            className="h-8 text-xs font-medium text-primary-600 border-primary-200 hover:bg-primary-50"
          >
            Activate
          </Button>
        )}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100">
        {account.accountNumber ? (
          <p className="text-xs text-gray-400">
            No rek : {account.accountNumber}
          </p>
        ) : (
          <p className="text-xs text-gray-500">{account.description}</p>
        )}
      </div>
    </Card>
  );
};

export default AccountCard;
