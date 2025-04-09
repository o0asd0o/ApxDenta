import type { Kysely } from 'kysely';
import type { DB } from '~/prisma/out/types';
import { db } from '../db/database';
import type { AppType, TrpcContext } from '../types/hono';

type ContextFun = () => AppType['Variables'] & {
  db: Kysely<DB>;
};

type Context = ReturnType<ContextFun>;

const createTrpcContext = (c: TrpcContext): ContextFun => {
  const user = c.get('user');
  const session = c.get('session');

  if (!db) {
    throw new Error('Database not connected');
  }

  return () => ({ db, session, user });
};

export { createTrpcContext };
export type { Context };
