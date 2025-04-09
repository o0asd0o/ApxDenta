import { Body, Container, Head, Html, Link, Preview, Tailwind, Text } from '@react-email/components';
import React from "react";

type ApprovedLeaveSecondForEmployeeProps = {
  name: String,
  approverRole: String;
} 
const ApprovedLeaveSecondForEmployee = ({ name = 'Jomel', approverRole = "Role" }: ApprovedLeaveSecondForEmployeeProps) => {
  return (
      <Html>
         <Head />
         <Preview>Your Leave</Preview>
         <Tailwind>
            <Body className="bg-white text-[#333] font-serif px-4">
               <Container>
                   <Text>Hi {name},</Text>
                    <Text className='mb-10'>
                      Your leave request has been <b>APPROVED!</b> by
                      <span className='ml-1 font-bold p-[2px]'>{approverRole}</span>
                    </Text>
                    
                    {/** @ts-ignore */}
                    Please login to <Link clicktracking="off" href={process.env.APP_LINK}>{process.env.APP_LINK_2}</Link>
               </Container>
            </Body>
         </Tailwind>
      </Html>
   )
}

export { ApprovedLeaveSecondForEmployee };
export type { ApprovedLeaveSecondForEmployeeProps };
export default ApprovedLeaveSecondForEmployee
