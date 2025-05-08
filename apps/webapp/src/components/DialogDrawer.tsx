import {
  Button,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@repo/ui/components';
import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
  title: string;
  actionText?: string;
  footer?: React.ReactNode;
};

export const DrawerModal: React.FC<Props> = ({
  className,
  actionText,
  title,
  children,
  footer,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary" className={className}>
          {actionText || 'Open'}
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0 absolute top-10 right-2.5 h-[calc(100%_-_80px)] rounded-3xl w-[500px] sm:max-w-[500px]">
        <SheetHeader className="border-b border-b-border px-4 py-3">
          <SheetTitle className="text-lg">{title}</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4 px-6">{children}</div>
        {!!footer && (
          <SheetFooter className="border-t border-border justify-end">
            {footer}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
