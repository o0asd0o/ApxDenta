import type { AuthInstance } from '@/auth/auth-server';
import type { DatabaseInstance } from '@/db';

export type Roles = 'genStaff' | 'doctor' | 'owner' | 'admin';

export type TrpcContextSession = {
  db: DatabaseInstance;
  session: AuthInstance['$Infer']['Session'] | null;
  organizationId: string | null;
};

export type TRPCContext = {
  auth: AuthInstance;
  db: DatabaseInstance;
  headers: Headers;
};

export type HandlerType<T> = {
  input: T;
  ctx: TrpcContextSession;
};
