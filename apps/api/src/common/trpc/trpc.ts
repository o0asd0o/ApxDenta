import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { type CustomError, errors } from '../errors';
import type { Context } from './context';

const { router, middleware, procedure } = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter(errorData) {
    const error = errorData.error as CustomError;
    const { shape } = errorData;

    return {
      ...shape,
      data: { ...shape.data, cause: error.causeData },
    };
  },
});

const isAuthenticated = middleware((opts) => {
  const { ctx } = opts;
  if (!ctx.session || !ctx.user) {
    throw errors.unauthorized('You are not authorized to have this request');
  }

  return opts.next({ ctx });
});

const public_ = procedure;
const protected_ = procedure.use(isAuthenticated);

export { router, middleware, public_, protected_ };
