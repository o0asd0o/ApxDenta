import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import React from 'react';

type MigrationNewPasswordProps = {
  name: string;
  email: string;
  password: string;
};

const MigrationNewPassword: React.FC<MigrationNewPasswordProps> = ({
  name = 'Jomel Ortega',
  email = 'jomelorskie@gmail.com',
  password = 'password123!',
}: MigrationNewPasswordProps) => {
  return (
    <Html>
      <Head />
      <Preview>Migration Notice - Systech Industries Portal</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-gray-700 my-auto mx-auto font-sans px-4">
          <Container>
            <Text>Hi {name},</Text>
            <Text>
              We are now migrating our{' '}
              <strong>Systech Industries HR System</strong> into a new website
              URL:{' '}
              <a className="mb-[20px]" href={process.env.APP_LINK}>
                {process.env.APP_LINK_2}
              </a>
            </Text>
            <Text>
              That being said, we ask you to login with the following
              credentials
            </Text>
            <Heading as="h3">New Credentials:</Heading>
            <Section className=" p-2 rounded-1 mt-[15px]">
              <code className="bg-[#d2d2d240] pl-2 mb-10 block text-[#333] ">
                Username: <span className="font-bold">{email}</span> <br />
                Password: <span className="font-bold">{password}</span>
              </code>
              <Text>
                The above will be your new username and password going forward,
                but we suggest to change your password immediately for added
                security:
              </Text>
              <code className="bg-[#d2d2d240] pl-2 mb-10 block text-[#333]">
                Login -&gt; Settings -&gt; My Profile -&gt; Change Password
              </code>
              Please login to{' '}
              <a className="mb-[20px]" href={process.env.APP_LINK}>
                {process.env.APP_LINK_2}
              </a>
              <Text className="font-[11px] text-[#333]">
                ****
                <strong className="text-[#e72300]">
                  DO NOT SHARE YOUR CREDENTIALS TO ANYONE
                </strong>
                &nbsp;****
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export { MigrationNewPassword };
export type { MigrationNewPasswordProps };
export default MigrationNewPassword;
