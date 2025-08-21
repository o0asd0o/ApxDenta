import { publicProcedure, router } from '@/server/trpc';
import * as validateEmail from './handlers/validate-email';

const utilities = router({
  validateEmail: publicProcedure
    .input(validateEmail.inputSchema)
    .mutation(validateEmail.handler),
});

export default utilities;
