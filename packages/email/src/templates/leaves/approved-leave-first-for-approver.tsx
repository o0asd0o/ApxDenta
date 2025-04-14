import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components';
import React from 'react';

type ApprovedLeaveFirstForApproverProps = {
  name: string;
  approverRole: string;
  lastApprover: {
    name: string;
    role: string;
  };
};
const ApprovedLeaveFirstForApprover = ({
  name = 'Jomel',
  approverRole = 'Random',
  lastApprover = { name: 'Sample1', role: 'Role' },
}: ApprovedLeaveFirstForApproverProps) => {
  return (
    <Html>
      <Head />
      <Preview>For Leave Approval</Preview>
      <Tailwind>
        <Body className="bg-white text-[#333] font-serif px-4">
          <Container>
            <Text>Hi {approverRole},</Text>
            <Text className="mb-10">
              Employee
              <span className="mx-1 font-bold p-[2px]">{name}</span>
              has requested a leave and is waiting on your approval for
              completion
            </Text>
            <Text>
              This leave was recently approved by
              <span className="mx-1 font-bold p-[2px]">
                {lastApprover.name}
              </span>
              ({lastApprover.role})
            </Text>
            Please login to
            {/** @ts-ignore */}
            <Link clicktracking="off" href={process.env.APP_LINK}>
              {process.env.APP_LINK_2}
            </Link>{' '}
            to approve
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export { ApprovedLeaveFirstForApprover };
export type { ApprovedLeaveFirstForApproverProps };
export default ApprovedLeaveFirstForApprover;
