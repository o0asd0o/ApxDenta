import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import React from 'react';

type OrganizationInviteProps = {
  name: string;
  email: string;
  token: string;
};

const OrganizationInvite = ({
  name = 'Jomel Ortega',
  email = 'jomelorskie@gmail.com',
  token = '123',
}: OrganizationInviteProps) => {
  return (
    <Html>
      <Head />
      <Preview>ApxDenta Organization Invite</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-gray-700 my-auto mx-auto font-sans px-4">
          <Container>
            <Text>
              Someone has requested a password reset for the following account:
            </Text>

            <Section className="p-2 rounded-1 mt-[15px]">
              <code className="bg-[#d2d2d240] pl-2 mb-10 block text-[#333] ">
                Account name: <span className="font-bold">{name}</span> <br />
                Username: <span className="font-bold">{email}</span>
              </code>
              <Text>
                To reset your password please click on the following link:
              </Text>
              <Link
                href={`${process.env.APP_LINK}reset-password/?token=${token}`}
                className="bg-green-800 outline-0 text-white decoration p-3 rounded-sm"
              >
                Click here to reset your password
              </Link>
              <Text className="mt-10">
                If it was a mistake, please ignore this email and nothing will
                happen.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export { OrganizationInvite };
export type { OrganizationInviteProps };
export default OrganizationInvite;
