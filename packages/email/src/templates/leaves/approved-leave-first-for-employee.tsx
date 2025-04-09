import { Body, Container, Head, Html, Link, Preview, Tailwind, Text } from '@react-email/components';
import React from "react";

type ApprovedLeaveFirstForEmployeeProps = {
  name: String,
  approver: {
    name: String;
    role: String;
  },
  nextApproverRole: String;
} 
const ApprovedLeaveFirstForEmployee = ({ name = 'Jomel', approver = { name: "Sample", role: "ROLE"}, nextApproverRole= "NextRole" }: ApprovedLeaveFirstForEmployeeProps) => {
  return (
      <Html>
         <Head />
         <Preview>For Leave Approval</Preview>
         <Tailwind>
            <Body className="bg-white text-[#333] font-serif px-4">
               <Container>
                   <Text>Hi {name},</Text>
                    <Text className='mb-10'>
                      Your leave request is recently approved by <b>{approver.name}</b>
                      <span className='ml-1 font-bold p-[2px]'>({approver.role})</span>
                    </Text>
                    <Text className='mb-10'>
                      Please wait for the approval of
                      <span className='mx-1 font-bold p-[2px]'>{nextApproverRole}</span>
                      to complete your leave request!
                    </Text>
                    
                    {/** @ts-ignore */}
                    Please login to <Link clicktracking="off" href={process.env.APP_LINK}>{process.env.APP_LINK_2}</Link> to see updates
               </Container>
            </Body>
         </Tailwind>
      </Html>
   )
}

export { ApprovedLeaveFirstForEmployee };
export type { ApprovedLeaveFirstForEmployeeProps };
export default ApprovedLeaveFirstForEmployee
