import {
  Button,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@repo/ui/components';
import React, { type FormEventHandler } from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
  title: string;
  actionText?: string;
  mobileIcon?: React.JSX.Element;
  footer?: React.JSX.Element;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export const DialogDrawer: React.FC<Props> = ({
  open,
  setOpen,
  className,
  actionText,
  mobileIcon,
  title,
  children,
  footer,
  onSubmit,
}) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="primary" className={className}>
          <span className="hidden sm:inline">{actionText || 'Open'}</span>
          <span className="sm:hidden inline">{mobileIcon}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0 absolute top-10 right-2.5 h-[calc(100%_-_80px)] rounded-3xl w-[calc(100%-20px)] sm:max-w-[500px]">
        <SheetHeader className="border-b border-b-border px-4 py-3 h-14">
          <SheetTitle className="text-lg">{title}</SheetTitle>
        </SheetHeader>
        <form
          className="flex flex-col h-[calc(100%_-_56px)] flex-1"
          onSubmit={onSubmit}
        >
          <div className="grid gap-4 py-4 px-6 h-[calc(100%_-_70px)] overflow-y-scroll">
            {children}
          </div>
          {!!footer && (
            <SheetFooter className="border-t border-border justify-end">
              {footer}
            </SheetFooter>
          )}
        </form>
      </SheetContent>
    </Sheet>
  );
};
