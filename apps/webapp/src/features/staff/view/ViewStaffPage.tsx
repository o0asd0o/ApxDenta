import { StaffActionsProvider } from '../__common/context/StaffActionsProvider';
import ArchiveStaff from '../archive/ArchiveStaff';
import UpdateStaff from '../update/UpdateStaff';
import ViewStaff from './ViewStaff';

const ViewStaffPage = () => {
  return (
    <StaffActionsProvider>
      <UpdateStaff />
      <ArchiveStaff />
      <ViewStaff />
    </StaffActionsProvider>
  );
};

export default ViewStaffPage;
