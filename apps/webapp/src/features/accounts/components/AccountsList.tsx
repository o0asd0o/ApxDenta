import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import AccountCard, { type AccountType } from './AccountCard';

type Props = {
  title: string;
  accounts: AccountType[];
  defaultExpanded?: boolean;
};

const AccountsList: React.FC<Props> = ({
  title,
  accounts,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full group"
      >
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {title}
        </h3>
        <ChevronDown
          className={`size-4 text-gray-400 transition-transform ${
            isExpanded ? 'rotate-0' : '-rotate-90'
          }`}
        />
      </button>
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountsList;
