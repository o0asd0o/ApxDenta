import { DataTable } from '@/components/data-table/DataTable';
import {
  List,
  ListItem,
  Root,
  TabContent,
} from '@/components/tabs/NavigationTabs';
import { Stethoscope } from 'lucide-react';
import type React from 'react';
import CreateStaff from './CreateStaff';
import { columns } from './__columns';
import { generateDummyStaffData } from './__helpers';

const staffData = generateDummyStaffData(20);

export const StaffList: React.FC = () => {
  return (
    <div>
      <Root defaultValue="doctor">
        <List>
          <ListItem value="doctor">Doctor Staff</ListItem>
          <ListItem value="general">General Staff</ListItem>
        </List>
        <TabContent value="doctor" className="py-5 gap-5 flex flex-col">
          <div className="flex ">
            <div className="flex items-center gap-1.5">
              <span className="p-1.5 rounded-sm bg-accent">
                <Stethoscope className="size-4" />
              </span>

              <span className="text-lg font-bold">120</span>
              <span className="text-xs text-gray-400">Doctor</span>
            </div>

            <CreateStaff />
          </div>
          <div className="container mx-auto">
            <DataTable columns={columns} data={staffData} />
          </div>
        </TabContent>
        <TabContent value="general">General Staff content</TabContent>
      </Root>
    </div>
  );
};
