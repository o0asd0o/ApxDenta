import { StackDialogDrawer } from '@/components/dialog/stacked/StackDialogDrawer';
import StackProvider, {
  useCurrentIndexAction,
} from '@/components/dialog/stacked/StackProvider';
import { useActiveOrganization } from '@/lib/auth-client';
import { Button, Form } from '@repo/ui/components';
import { createFileRoute } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

export const Route = createFileRoute('/_protected/demo')({
  component: RouteComponent,
});

const ChildComponent: React.FC = () => {
  const next = useCurrentIndexAction('increment');
  const prev = useCurrentIndexAction('decrement');

  return (
    <div className="p-5">
      Protected Demo Route
      <div className="flex gap-2">
        <Button onClick={() => next()}>next</Button>
        <Button onClick={() => prev()}>prev</Button>
      </div>
    </div>
  );
};

const STACKS = [
  {
    id: 'first',
    component: <ChildComponent />,
    title: 'Child Component 1',
  },
  {
    id: 'second',
    component: <ChildComponent />,
    title: 'Child Component 2',
  },
  {
    id: 'third',
    component: <ChildComponent />,
    title: 'Child Component 3',
  },
];

function RouteComponent() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const form = useForm();
  const { data: activeOrg } = useActiveOrganization();
  return (
    <Form {...form}>
      <StackProvider stackCount={STACKS.length}>
        <StackDialogDrawer
          open={drawerOpen}
          setOpen={setDrawerOpen}
          className="ml-auto"
          actionText="Add Treatment"
          disabledTooltip={
            !activeOrg ? 'You need to setup an organization first' : undefined
          }
          mobileIcon={<PlusIcon className="size-5" />}
          onSubmit={form.handleSubmit((values) => {
            console.log('values', values);
          })}
          stacks={STACKS}
          footer={
            <Button
              type="submit"
              variant="primary"
              className="w-[120px]"
              // disabled={isPending || submitting}
              // isLoading={isPending || submitting}
              loadingText="Saving..."
            >
              Save
            </Button>
          }
        />
      </StackProvider>
    </Form>
  );
}
