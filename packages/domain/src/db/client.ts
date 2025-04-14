import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import type { DB } from './prisma/out/types';

export type DatabaseInstance = Kysely<DB>;

export const createDb = ({ databaseUrl }: { databaseUrl: string }) => {
  const dialect = new PostgresDialect({
    pool: new Pool({
      connectionString: databaseUrl,
      max: 10,
    }),
  });

  return new Kysely<DB>({ dialect });
};
