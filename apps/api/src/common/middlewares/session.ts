import type { Context, Next } from 'hono';
import { auth } from '~/lib/auth';

const getSession = async (c: Context) => {
  return auth.api.getSession({ headers: c.req.raw.headers });
};
export const sessionMiddleware = async (c: Context, next: Next) => {
  const session = await getSession(c); //await; auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set('user', null);
    c.set('session', null);
    return next();
  }

  c.set('user', session.user);
  c.set('session', session.session);

  return next();
};
