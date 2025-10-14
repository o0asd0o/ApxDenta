import {
  List,
  ListItem,
  Root,
  TabContent,
} from '@/components/tabs/NavigationTabs';
import { useQueryState } from 'nuqs';
import type React from 'react';
import Doctors from './Doctors';
import GenStaffs from './GenStaffs';

const StaffList: React.FC = () => {
  const [tab, setTab] = useQueryState('tab', { defaultValue: 'doctor' });
  return (
    <div className="h-full flex flex-col">
      <Root defaultValue={tab} onChangeTab={setTab}>
        <List>
          <ListItem value="doctor">Doctor Staff</ListItem>
          <ListItem value="general">General Staff</ListItem>
        </List>
        <TabContent value="doctor" className="py-5 gap-5 flex flex-col flex-1">
          <Doctors />
        </TabContent>
        <TabContent value="general" className="py-5 gap-5 flex flex-col flex-1">
          <GenStaffs />
        </TabContent>
      </Root>
    </div>
  );
};

export default StaffList;
