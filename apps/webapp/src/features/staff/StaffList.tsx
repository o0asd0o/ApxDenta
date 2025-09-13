import {
  List,
  ListItem,
  Root,
  TabContent,
} from '@/components/tabs/NavigationTabs';
import type React from 'react';
import Doctors from './Doctors';
import GenStaffs from './GenStaffs';

const StaffList: React.FC = () => {
  return (
    <div>
      <Root defaultValue="doctor">
        <List>
          <ListItem value="doctor">Doctor Staff</ListItem>
          <ListItem value="general">General Staff</ListItem>
        </List>
        <TabContent value="doctor" className="py-5 gap-5 flex flex-col">
          <Doctors />
        </TabContent>
        <TabContent value="general" className="py-5 gap-5 flex flex-col">
          <GenStaffs />
        </TabContent>
      </Root>
    </div>
  );
};

export default StaffList;
