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

type AccountCreationProps = {
  name: string;
  username: string;
  password: string;
};

const AccountCreation = ({
  name,
  username,
  password,
}: AccountCreationProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Registration</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-gray-700 my-auto mx-auto font-sans">
          <Container>
            <Text>Hi {name},</Text>
            <Text>
              Your registration on <strong>Systech Industries HR System</strong>{' '}
              is successful!
            </Text>
            <Heading as="h3">CREDENTIALS:</Heading>
            <Section className=" p-2 rounded-1 mt-[15px]">
              <code className="bg-[#d2d2d240] pl-2 mb-10 block text-[#333] font-bold">
                Username: {username} <br />
                Password: {password}
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

export { AccountCreation };
export type { AccountCreationProps };
export default AccountCreation;
