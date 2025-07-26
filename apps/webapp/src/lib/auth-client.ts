import { createAuthClient } from '@repo/domain/auth';

const authClient = createAuthClient({
  apiBaseUrl: `${import.meta.env.VITE_PUBLIC_SERVER_URL}`,
});

export const {
  signIn,
  signOut,
  signUp,
  requestPasswordReset,
  resetPassword,
  useSession,
  organization,
} = authClient;

// YOU STOPPED AT CREATING ORGANIZATION

const invite = () => {
  return organization.inviteMember({
    email: '',
    role: 'genStaff',
  });
};

const createOrg = () => {
  return organization.create({
    name: 'New Organization',
    slug: 'new-organization',
    logo: 'https://example.com/logo.png',
    metadata: {
      description: 'This is a new organization created via the auth client.',
      address: {
        lat: 1.23456,
        lng: 1.23456,
      },
      googleMapUrl: 'https://maps.google.com/?q=123+Main+St,+Anytown,+USA',
      contactNumber: '123-456-7890',
      website: 'https://example.com',
    },
  });
};
