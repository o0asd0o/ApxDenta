import { protectedProcedure, router } from '@/server/trpc';
import * as createComponent from './handlers/create-component';
import * as getAllComponents from './handlers/get-all-components';
import * as updateComponent from './handlers/update-component';

const components = router({
  createComponent: protectedProcedure
    .input(createComponent.inputSchema)
    .mutation(createComponent.handler),
  getAllComponents: protectedProcedure
    .input(getAllComponents.inputSchema)
    .query(getAllComponents.handler),
  updateComponent: protectedProcedure
    .input(updateComponent.inputSchema)
    .mutation(updateComponent.handler),
});

export default components;
