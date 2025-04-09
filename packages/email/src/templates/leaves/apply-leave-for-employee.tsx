import { Body, Container, Head, Html, Link, Preview, Tailwind, Text } from '@react-email/components';
import React from "react";

type ApplyLeaveForEmployeeProps = {
  name: String,
  approverRole: String;
} 
const ApplyLeaveForEmployee = ({ name, approverRole }: ApplyLeaveForEmployeeProps) => {
  return (
      <Html>
         <Head />
         <Preview>Your Leave</Preview>
         <Tailwind>
            <Body className="bg-white text-[#333] font-serif px-4">
               <Container>
                   <Text>Hi {name},</Text>
                    <Text className='mb-10'>
                      Your leave request is sent to your
                      <span className='ml-1 font-bold p-[2px]'>{approverRole}</span>, please wait for approval
                    </Text>
                    
                    {/** @ts-ignore */}
                    Please login to <Link clicktracking="off" href={process.env.APP_LINK}>{process.env.APP_LINK_2}</Link> to see updates
               </Container>
            </Body>
         </Tailwind>
      </Html>
   )
}

export { ApplyLeaveForEmployee };
export type { ApplyLeaveForEmployeeProps };
export default ApplyLeaveForEmployee
