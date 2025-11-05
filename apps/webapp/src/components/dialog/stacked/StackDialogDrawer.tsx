import { cn } from '@/lib/utils';
import { Tooltip } from '@radix-ui/react-tooltip';
import {
  Button,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
  TooltipContent,
  TooltipTrigger,
} from '@repo/ui/components';
import { useIsMobile } from '@repo/ui/hooks/use-mobile';
import React, { type FormEventHandler } from 'react';
import { useCurrentIndex, useCurrentIndexAction } from './StackProvider';
import { getStackTranslation } from './__helpers';

type Props = {
  className?: string;
  stacks: {
    id: string;
    title: React.ReactNode;
    component: React.JSX.Element;
  }[];
  actionText?: React.ReactNode;
  disabledTooltip?: string;
  mobileIcon?: React.JSX.Element;
  footer?: React.JSX.Element;
  open?: boolean;

  setOpen?: (open: boolean) => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export const StackDialogDrawer: React.FC<Props> = ({
  open,
  setOpen,
  className,
  actionText,
  disabledTooltip,
  mobileIcon,
  stacks,
  footer,
  onSubmit,
}) => {
  const currentIndex = useCurrentIndex();
  const setIndex = useCurrentIndexAction('set');
  const decrementIndex = useCurrentIndexAction('decrement');
  const Comp = typeof onSubmit === 'function' ? 'form' : 'div';

  const isMobile = useIsMobile();

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        setOpen?.(open);
        if (!open) setIndex(0);
      }}
    >
      {disabledTooltip && (
        <Tooltip>
          <TooltipTrigger>
            <SheetTrigger asChild>
              <Button
                variant="primary"
                disabled
                className={cn(className, 'cursor-not-allowed')}
              >
                <span className="hidden sm:inline">{actionText || 'Open'}</span>
                <span className="sm:hidden inline">{mobileIcon}</span>
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="center"
            className="bg-red-500 text-shadow-gray-800 [&>span>svg]:bg-red-500 [&>span>svg]:fill-red-500"
          >
            {disabledTooltip}
          </TooltipContent>
        </Tooltip>
      )}
      {!disabledTooltip && typeof actionText !== 'undefined' && (
        <SheetTrigger asChild>
          <Button variant="primary" className={className}>
            <span className="hidden sm:inline">{actionText || 'Open'}</span>
            <span className="sm:hidden inline">{mobileIcon}</span>
          </Button>
        </SheetTrigger>
      )}
      <SheetOverlay />
      {stacks.map((stack, index) => {
        console.log({ currentIndex, index });
        if (index > currentIndex) return null;
        return (
          <SheetContent
            side={index !== 0 ? 'none' : undefined}
            key={stack.id}
            className={cn(
              'gap-0 absolute top-5 sm:top-10 right-2.5 h-[calc(100%_-_40px)] sm:h-[calc(100%_-_80px)] rounded-3xl w-[calc(100%-20px)] sm:max-w-[500px]',
              currentIndex !== 0 && 'translate-x-[var(--translation)]',
            )}
            overlay={false}
            style={getStackTranslation(currentIndex, index, isMobile)}
            {...(currentIndex === index &&
              index !== 0 && {
                onClose: decrementIndex,
              })}
          >
            <SheetHeader className="border-b border-b-border px-4 py-3 h-14">
              <SheetTitle className="text-lg">{stack.title}</SheetTitle>
            </SheetHeader>
            <Comp
              className="flex flex-col h-[calc(100%_-_56px)] flex-1"
              // @ts-ignore
              onSubmit={onSubmit}
            >
              <div
                className={cn(
                  'grid gap-4 py-4 h-[calc(100%_-_70px)] overflow-y-scroll',
                  !!footer && 'px-6',
                )}
              >
                {stack.component}
              </div>
              {!!footer && (
                <SheetFooter className="border-t border-border justify-end">
                  {footer}
                </SheetFooter>
              )}
            </Comp>
          </SheetContent>
        );
      })}
    </Sheet>
  );
};
