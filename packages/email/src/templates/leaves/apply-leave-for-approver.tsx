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

type ApplyLeaveForApproverProps = {
  name: string;
  approverRole: string;
};
const ApplyLeaveForApprover = ({
  name,
  approverRole,
}: ApplyLeaveForApproverProps) => {
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
              <span className="ml-1 font-bold p-[2px]">{name}</span> has
              requested a leave and waiting for your approval
            </Text>
            Please login to {/** @ts-ignore */}
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

export { ApplyLeaveForApprover };
export type { ApplyLeaveForApproverProps };
export default ApplyLeaveForApprover;
