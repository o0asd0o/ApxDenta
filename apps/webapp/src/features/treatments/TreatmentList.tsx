import {
  List,
  ListItem,
  Root,
  TabContent,
} from '@/components/tabs/NavigationTabs';
import React, { useState } from 'react';
import ActiveTreatments from './ActiveTreatments';
import InactiveTreatments from './InactiveTreatments';

const TreatmentList: React.FC = () => {
  const [tab, setTab] = useState<string>('active');

  return (
    <div className="flex flex-1 flex-col">
      <Root defaultValue={tab} onChangeTab={(t) => setTab(t as string)}>
        <List>
          <ListItem value="active">Active Treatments</ListItem>
          <ListItem value="inactive">Inactive Treatments</ListItem>
        </List>
        <TabContent value="active" className="py-5 gap-5 flex flex-col flex-1">
          <ActiveTreatments />
        </TabContent>
        <TabContent
          value="inactive"
          className="py-5 gap-5 flex flex-col flex-1"
        >
          <InactiveTreatments />
        </TabContent>
      </Root>
    </div>
  );
};

export default TreatmentList;
