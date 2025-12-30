import {
  Button,
  Form,
  Loader,
  SheetClose,
  SheetFooter,
} from '@repo/ui/components';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';

type Props<T extends {}> = {
  isLoading: boolean;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void>;
  children: React.ReactNode;
};

function UpdateWrapper<T extends {}>({
  isLoading,
  form,
  onSubmit,
  children,
}: Props<T>) {
  if (form.formState.isLoading) {
    return (
      <Loader className="[&>svg]:size-[50px] [&>svg]:text-gray-300 h-full" />
    );
  }

  return (
    <Form {...form}>
      <form
        className="h-full flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <AnimatePresence>
          <motion.div
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -5, opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="px-5 py-4 max-h-[calc(100%_-_70px)] overflow-x-auto"
          >
            {children}
          </motion.div>
        </AnimatePresence>
        <SheetFooter className="px-5 flex justify-end border-t">
          <SheetClose>
            <Button variant="ghost" className="w-[120px]" type="button">
              Cancel
            </Button>
          </SheetClose>
          <Button
            type="submit"
            variant="primary"
            className="w-[120px]"
            disabled={isLoading || !form.formState.isDirty}
            isLoading={isLoading}
            loadingText="Saving..."
          >
            Update
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}

export default UpdateWrapper;
