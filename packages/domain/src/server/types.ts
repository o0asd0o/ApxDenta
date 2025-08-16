import type { AuthInstance } from '@/auth';
import type { DatabaseInstance } from '@/db';

export type TrpcContextSession = {
  db: DatabaseInstance;
  session: AuthInstance['$Infer']['Session'] | null;
  organizationId: string;
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
