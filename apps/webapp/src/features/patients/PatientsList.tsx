import {
  List,
  ListItem,
  Root,
  TabContent,
} from '@/components/tabs/NavigationTabs';
import { useQueryState } from 'nuqs';
import type React from 'react';
import PatientsTab from './PatientsTab';
import { PatientActionsProvider } from './__common/context/PatientActionsProvider';
import DeleteMultiplePatients from './delete/DeleteMultiplePatients';
import DeletePatient from './delete/DeletePatient';
import UpdatePatient from './update/UpdatePatient';

const PatientsList: React.FC = () => {
  const [tab, setTab] = useQueryState('tab', { defaultValue: 'active' });
  return (
    <PatientActionsProvider>
      <div className="h-full flex flex-col">
        <Root defaultValue={tab} onChangeTab={setTab}>
          <List>
            <ListItem value="active">Active Patients</ListItem>
            <ListItem value="inactive">Inactive Patients</ListItem>
          </List>
          <TabContent
            value="active"
            className="py-5 gap-5 flex flex-col flex-1"
          >
            <PatientsTab isActive={true} />
          </TabContent>
          <TabContent
            value="inactive"
            className="py-5 gap-5 flex flex-col flex-1"
          >
            <PatientsTab isActive={false} />
          </TabContent>
        </Root>
      </div>

      {/* Patient action modals */}
      <UpdatePatient />
      <DeletePatient />
      <DeleteMultiplePatients />
    </PatientActionsProvider>
  );
};

export default PatientsList;
