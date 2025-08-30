import {
  Button,
  Form,
  Loader,
  SheetClose,
  SheetFooter,
} from '@repo/ui/components';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';

type Props<T extends {}> = {
  isLoading: boolean;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void>;
  children: React.ReactNode;
};
function Wrapper<T extends {}>({
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
        <div className="px-5 py-4 max-h-[calc(100%_-_70px)] overflow-x-auto">
          {children}
        </div>
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

export default Wrapper;
