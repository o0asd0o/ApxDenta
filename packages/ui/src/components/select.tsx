// Tremor Select [v1.0.0]

import * as SelectPrimitives from '@radix-ui/react-select';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCheckLine,
} from '@remixicon/react';
import React from 'react';

import { cn, focusInput, hasErrorInput } from '@repo/ui/lib/utils';
import { ChevronDown } from 'lucide-react';

const Select = SelectPrimitives.Root;
Select.displayName = 'Select';

const SelectGroup = SelectPrimitives.Group;
SelectGroup.displayName = 'SelectGroup';

const SelectValue = SelectPrimitives.Value;
SelectValue.displayName = 'SelectValue';

const selectTriggerStyles = [
  cn(
    // base
    'group/trigger flex w-full select-none items-center justify-between gap-2 truncate rounded-sm border px-2.5 py-2 shadow-xs outline-hidden transition sm:text-sm',
    // border color
    'border-gray-300 dark:border-gray-800',
    // text color
    'text-gray-900 dark:text-gray-50',
    // placeholder
    'data-placeholder:text-gray-500 dark:data-placeholder:text-gray-500',
    // background color
    'bg-white dark:bg-gray-950',
    // hover
    'hover:bg-gray-50 dark:hover:bg-gray-950/50',
    // disabled
    'data-disabled:bg-gray-100 data-disabled:text-gray-400',
    'dark:data-disabled:border-gray-700 dark:data-disabled:bg-gray-800 dark:data-disabled:text-gray-500',
    focusInput,
    // invalid (optional)
    // "dark:aria-invalid:ring-red-400/20 aria-invalid:ring-2 aria-invalid:ring-red-200 aria-invalid:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
  ),
];

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Trigger> & {
    hasError?: boolean;
    icon?: React.JSX.Element;
  }
>(({ className, hasError, children, icon, ...props }, forwardedRef) => {
  return (
    <SelectPrimitives.Trigger
      ref={forwardedRef}
      className={cn(
        selectTriggerStyles,
        hasError ? hasErrorInput : '',
        className,
      )}
      tremor-id="tremor-raw"
      {...props}
    >
      {icon}
      <span className="truncate">{children}</span>
      <SelectPrimitives.Icon asChild>
        <ChevronDown
          className={cn(
            'opacity-50 size-4.5 transition-all duration-200 ease-out group-data-[state=open]:rotate-180',
          )}
        />
      </SelectPrimitives.Icon>
    </SelectPrimitives.Trigger>
  );
});

SelectTrigger.displayName = 'SelectTrigger';

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.ScrollUpButton>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitives.ScrollUpButton
    ref={forwardedRef}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <RiArrowUpSLine className="size-3 shrink-0" aria-hidden="true" />
  </SelectPrimitives.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitives.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.ScrollDownButton>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitives.ScrollDownButton
    ref={forwardedRef}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <RiArrowDownSLine className="size-3 shrink-0" aria-hidden="true" />
  </SelectPrimitives.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitives.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Content>
>(
  (
    {
      className,
      position = 'popper',
      children,
      sideOffset = 8,
      collisionPadding = 10,
      ...props
    },
    forwardedRef,
  ) => (
    <SelectPrimitives.Portal>
      <SelectPrimitives.Content
        ref={forwardedRef}
        className={cn(
          // base
          'relative z-50 overflow-hidden rounded-md border shadow-xl shadow-black/[2.5%]',
          // widths
          'min-w-[calc(var(--radix-select-trigger-width)-2px)] max-w-[95vw]',
          // heights
          'max-h-(--radix-select-content-available-height)',
          // background color
          'bg-white dark:bg-gray-950',
          // text color
          'text-gray-900 dark:text-gray-50',
          // border color
          'border-gray-200 dark:border-gray-800',
          // transition
          'will-change-[transform,opacity]',
          // "data-[state=open]:animate-slide-down-and-fade",
          'data-[state=closed]:animate-hide',
          'data-[side=bottom]:animate-slide-down-and-fade data-[side=left]:animate-slide-left-and-fade data-[side=right]:animate-slide-right-and-fade data-[side=top]:animate-slide-up-and-fade',
          className,
        )}
        sideOffset={sideOffset}
        position={position}
        collisionPadding={collisionPadding}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitives.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[calc(var(--radix-select-trigger-width))]',
          )}
        >
          {children}
        </SelectPrimitives.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitives.Content>
    </SelectPrimitives.Portal>
  ),
);

SelectContent.displayName = 'SelectContent';

const SelectGroupLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Label>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitives.Label
    ref={forwardedRef}
    className={cn(
      // base
      'px-3 py-2 text-xs font-medium tracking-wide',
      // text color
      'text-gray-500 dark:text-gray-500',
      className,
    )}
    {...props}
  />
));

SelectGroupLabel.displayName = 'SelectGroupLabel';

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Item>
>(({ className, children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitives.Item
      ref={forwardedRef}
      className={cn(
        // base
        'grid cursor-pointer grid-cols-[1fr_20px] gap-x-2 rounded-sm px-3 py-2 outline-hidden transition-colors data-[state=checked]:font-bold sm:text-sm',
        // text color
        'text-gray-900 dark:text-gray-50',
        // disabled
        'data-disabled:pointer-events-none data-disabled:text-gray-400 data-disabled:hover:bg-none dark:data-disabled:text-gray-600',
        // focus
        'focus-visible:bg-gray-100 dark:focus-visible:bg-gray-900',
        // hover
        'hover:bg-gray-100 dark:hover:bg-gray-900',
        className,
      )}
      {...props}
    >
      <SelectPrimitives.ItemText className="flex-1 truncate">
        {children}
      </SelectPrimitives.ItemText>
      <SelectPrimitives.ItemIndicator>
        <RiCheckLine
          className="size-5 shrink-0 text-gray-800 dark:text-gray-200"
          aria-hidden="true"
        />
      </SelectPrimitives.ItemIndicator>
    </SelectPrimitives.Item>
  );
});

SelectItem.displayName = 'SelectItem';

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Separator>
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitives.Separator
    ref={forwardedRef}
    className={cn(
      // base
      '-mx-1 my-1 h-px',
      // background color
      'bg-gray-300 dark:bg-gray-700',
      className,
    )}
    {...props}
  />
));

SelectSeparator.displayName = 'SelectSeparator';

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
