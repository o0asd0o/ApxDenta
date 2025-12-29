import { Button, Card } from '@repo/ui/components';
import {
  ArrowLeftRight,
  Banknote,
  Building2,
  CircleDollarSign,
  CreditCard,
  Landmark,
  PiggyBank,
  Plus,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import React from 'react';
import type { AccountType } from './components/AccountCard';
import AccountsList from './components/AccountsList';
import StatCard from './components/StatCard';

// Mock data for accounts
const activeAccounts: AccountType[] = [
  {
    id: '1',
    name: 'Free Cash',
    balance: 3034124,
    description: 'This is money for this need',
    icon: <Wallet className="size-6 text-emerald-600" />,
    iconBgColor: 'bg-emerald-100',
    isActive: true,
  },
  {
    id: '2',
    name: 'Drug Purchase',
    balance: 4341786,
    accountNumber: '312 3123 3123 3314',
    icon: <CreditCard className="size-6 text-amber-600" />,
    iconBgColor: 'bg-amber-100',
    isActive: true,
  },
  {
    id: '3',
    name: 'Treatment Fund',
    balance: 3546256,
    description: 'This is money for this need',
    icon: <CircleDollarSign className="size-6 text-blue-600" />,
    iconBgColor: 'bg-blue-100',
    isActive: true,
  },
  {
    id: '4',
    name: 'Stock Fund',
    balance: 3019124,
    description: 'This is money for this need',
    icon: <TrendingUp className="size-6 text-violet-600" />,
    iconBgColor: 'bg-violet-100',
    isActive: true,
  },
];

const inactiveAccounts: AccountType[] = [
  {
    id: '5',
    name: 'Monthly Rent',
    balance: 8234200,
    accountNumber: '312 3123 3123 3314',
    icon: <Building2 className="size-6 text-gray-500" />,
    iconBgColor: 'bg-gray-100',
    isActive: false,
  },
  {
    id: '6',
    name: 'Drug Purchase',
    balance: 1220093,
    accountNumber: '312 3123 3123 3314',
    icon: <PiggyBank className="size-6 text-gray-500" />,
    iconBgColor: 'bg-gray-100',
    isActive: false,
  },
  {
    id: '7',
    name: 'Monthly Rent',
    balance: 11129,
    accountNumber: '312 3123 3123 3314',
    icon: <Landmark className="size-6 text-gray-500" />,
    iconBgColor: 'bg-gray-100',
    isActive: false,
  },
];

const Accounts: React.FC = () => {
  const totalAssetValue = 13232432;
  const liquidAssets = 8983123;
  const physicalAssets = 4249309;

  return (
    <div className="flex flex-col gap-6 p-5">
      {/* Stats Section */}
      <Card className="flex flex-col md:flex-row md:items-center divide-y md:divide-y-0 md:divide-x divide-gray-200 p-0">
        <StatCard
          title="Total Asset Value"
          value={totalAssetValue}
          icon={<Banknote className="size-5" />}
        />
        <StatCard
          title="Liquid Assets"
          value={liquidAssets}
          icon={<Wallet className="size-5" />}
          trend={{ value: 4.51, isPositive: true }}
        />
        <StatCard
          title="Physical Assets Value"
          value={physicalAssets}
          icon={<Building2 className="size-5" />}
          trend={{ value: 2.51, isPositive: false }}
        />
      </Card>

      {/* List Account Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">List Account</h2>
          <p className="text-sm text-gray-500">All account setup manually</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <ArrowLeftRight className="size-4" />
            Transfer money
          </Button>
          <Button variant="primary" className="gap-2">
            <Plus className="size-4" />
            Add new account
          </Button>
        </div>
      </div>

      {/* Active Accounts */}
      <AccountsList title="Active List" accounts={activeAccounts} />

      {/* Inactive Accounts */}
      <AccountsList
        title="Inactive List"
        accounts={inactiveAccounts}
        defaultExpanded={true}
      />
    </div>
  );
};

export default Accounts;
