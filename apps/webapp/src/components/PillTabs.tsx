import { Tabs, TabsList, TabsTrigger } from '@repo/ui/components';
import type React from 'react';

type Props<T> = {
  tabs: { value: T; label: React.JSX.Element }[];
  selectedTab: T;
  defaultSelectedTab?: T;
  onChangeTab: (value: T) => void;
};

function PillTabs<T extends string>({
  selectedTab,
  defaultSelectedTab,
  onChangeTab,
  tabs,
}: Props<T>) {
  return (
    <Tabs
      defaultValue={defaultSelectedTab}
      onValueChange={(value) => onChangeTab(value as T)}
      value={selectedTab}
    >
      <TabsList className="grid grid-cols-2 rounded-sm [&>button]:rounded-sm">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default PillTabs;
