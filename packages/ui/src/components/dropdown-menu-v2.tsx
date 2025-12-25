// Tremor Dropdown Menu [v1.0.0]

'use client';

import * as DropdownMenuPrimitives from '@radix-ui/react-dropdown-menu';
import {
  RiArrowRightSLine,
  RiCheckLine,
  RiCheckboxBlankCircleLine,
  RiRadioButtonFill,
} from '@remixicon/react';
import * as React from 'react';

import { cn } from '@repo/ui/lib/utils';

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitives.Root>) {
  return <DropdownMenuPrimitives.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitives.Trigger>) {
  return (
    <DropdownMenuPrimitives.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitives.Group>) {
  return (
    <DropdownMenuPrimitives.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuSubMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitives.Sub>) {
  return (
    <DropdownMenuPrimitives.Sub data-slot="dropdown-menu-sub" {...props} />
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitives.RadioGroup>) {
  return (
    <DropdownMenuPrimitives.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuSubMenuTrigger({
  className,
  children,
  ref,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.SubTrigger>,
  'asChild'
> & {
  ref?: React.Ref<React.ElementRef<typeof DropdownMenuPrimitives.SubTrigger>>;
}) {
  return (
    <DropdownMenuPrimitives.SubTrigger
      ref={ref}
      className={cn(
        // base
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-1 outline-hidden transition-colors data-[state=checked]:font-bold sm:text-sm',
        // text color
        'text-gray-900 dark:text-gray-50',
        // disabled
        'data-disabled:pointer-events-none data-disabled:text-gray-400 data-disabled:hover:bg-none dark:data-disabled:text-gray-600',
        // focus
        'focus-visible:bg-gray-100 data-[state=open]:bg-gray-100 dark:focus-visible:bg-gray-900 dark:data-[state=open]:bg-gray-900',
        // hover
        'hover:bg-gray-100 dark:hover:bg-gray-900',
        //
        className,
      )}
      {...props}
    >
      {children}
      <RiArrowRightSLine
        className="ml-auto size-4 shrink-0"
        aria-hidden="true"
      />
    </DropdownMenuPrimitives.SubTrigger>
  );
}
DropdownMenuSubMenuTrigger.displayName = 'DropdownMenuSubMenuTrigger';

function DropdownMenuSubMenuContent({
  className,
  collisionPadding = 8,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.SubContent> & {
  ref?: React.Ref<React.ElementRef<typeof DropdownMenuPrimitives.SubContent>>;
}) {
  return (
    <DropdownMenuPrimitives.Portal>
      <DropdownMenuPrimitives.SubContent
        ref={ref}
        collisionPadding={collisionPadding}
        className={cn(
          // base
          'relative z-50 overflow-hidden rounded-md border p-1 shadow-xl shadow-black/[2.5%]',
          // widths
          'min-w-32',
          // heights
          'max-h-[var(--radix-popper-available-height)]',
          // background color
          'bg-white dark:bg-gray-950',
          // text color
          'text-gray-900 dark:text-gray-50',
          // border color
          'border-gray-300 dark:border-gray-800',
          // transition
          'will-change-[transform,opacity]',
          'data-[state=closed]:animate-hide',
          'data-[side=bottom]:animate-slide-down-and-fade data-[side=left]:animate-slide-left-and-fade data-[side=right]:animate-slide-right-and-fade data-[side=top]:animate-slide-up-and-fade',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitives.Portal>
  );
}
DropdownMenuSubMenuContent.displayName = 'DropdownMenuSubMenuContent';

function DropdownMenuContent({
  className,
  sideOffset = 8,
  collisionPadding = 8,
  align = 'center',
  loop = true,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Content> & {
  ref?: React.Ref<React.ElementRef<typeof DropdownMenuPrimitives.Content>>;
}) {
  return (
    <DropdownMenuPrimitives.Portal>
      <DropdownMenuPrimitives.Content
        ref={ref}
        className={cn(
          // base
          'relative z-50 overflow-hidden rounded-md border p-1 shadow-xl shadow-black/[2.5%]',
          // widths
          'min-w-48',
          // heights
          'max-h-[var(--radix-popper-available-height)]',
          // background color
          'bg-white dark:bg-gray-950',
          // text color
          'text-gray-900 dark:text-gray-50',
          // border color
          'border-gray-300 dark:border-gray-800',
          // transition
          'will-change-[transform,opacity]',
          'data-[state=closed]:animate-hide',
          'data-[side=bottom]:animate-slide-down-and-fade data-[side=left]:animate-slide-left-and-fade data-[side=right]:animate-slide-right-and-fade data-[side=top]:animate-slide-up-and-fade',
          className,
        )}
        sideOffset={sideOffset}
        align={align}
        collisionPadding={collisionPadding}
        loop={loop}
        {...props}
      />
    </DropdownMenuPrimitives.Portal>
  );
}
DropdownMenuContent.displayName = 'DropdownMenuContent';

function DropdownMenuItem({
  className,
  shortcut,
  hint,
  children,
  asLink,
  ref,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Item>,
  'asChild'
> & {
  shortcut?: string;
  hint?: string;
  asLink?: boolean;
  ref?: React.Ref<React.ElementRef<typeof DropdownMenuPrimitives.Item>>;
}) {
  return (
    <DropdownMenuPrimitives.Item
      ref={ref}
      className={cn(
        // base
        'group/DropdownMenuItem relative flex cursor-pointer select-none items-center rounded-sm outline-hidden transition-colors data-[state=checked]:font-bold sm:text-sm',
        // padding - removed when asLink is true so link can handle full clickable area
        !asLink && 'py-1.5 pl-2 pr-1',
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
      tremor-id="tremor-raw"
      {...props}
    >
      {children}
      {hint && (
        <span
          className={cn(
            'ml-auto pl-2 text-sm text-gray-400 dark:text-gray-600',
          )}
        >
          {hint}
        </span>
      )}
      {shortcut && (
        <span
          className={cn(
            'ml-auto pl-2 text-sm text-gray-400 dark:text-gray-600',
          )}
        >
          {shortcut}
        </span>
      )}
    </DropdownMenuPrimitives.Item>
  );
}
DropdownMenuItem.displayName = 'DropdownMenuItem';

function DropdownMenuCheckboxItem({
  className,
  hint,
  shortcut,
  children,
  checked,
  ref,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.CheckboxItem>,
  'asChild'
> & {
  shortcut?: string;
  hint?: string;
  ref?: React.Ref<React.ElementRef<typeof DropdownMenuPrimitives.CheckboxItem>>;
}) {
  return (
    <DropdownMenuPrimitives.CheckboxItem
      ref={ref}
      className={cn(
        // base
        'relative flex cursor-pointer select-none items-center gap-x-2 rounded-sm py-1.5 pl-8 pr-1 outline-hidden transition-colors data-[state=checked]:font-bold sm:text-sm',
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
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <DropdownMenuPrimitives.ItemIndicator>
          <RiCheckLine
            aria-hidden="true"
            className="size-full shrink-0 text-gray-800 dark:text-gray-200"
          />
        </DropdownMenuPrimitives.ItemIndicator>
      </span>
      {children}
      {hint && (
        <span
          className={cn(
            'ml-auto text-sm font-normal text-gray-400 dark:text-gray-600',
          )}
        >
          {hint}
        </span>
      )}
      {shortcut && (
        <span
          className={cn(
            'ml-auto text-sm font-normal tracking-widest text-gray-400 dark:border-gray-800 dark:text-gray-600',
          )}
        >
          {shortcut}
        </span>
      )}
    </DropdownMenuPrimitives.CheckboxItem>
  );
}
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

function DropdownMenuRadioItem({
  className,
  hint,
  shortcut,
  children,
  ref,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.RadioItem>,
  'asChild'
> & {
  shortcut?: string;
  hint?: string;
  ref?: React.Ref<React.ElementRef<typeof DropdownMenuPrimitives.RadioItem>>;
}) {
  return (
    <DropdownMenuPrimitives.RadioItem
      ref={ref}
      className={cn(
        // base
        'group/DropdownMenuRadioItem relative flex cursor-pointer select-none items-center gap-x-2 rounded-sm py-1.5 pl-8 pr-1 outline-hidden transition-colors data-[state=checked]:font-bold sm:text-sm',
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
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <RiRadioButtonFill
          aria-hidden="true"
          className="size-full shrink-0 text-blue-500 group-data-[state=checked]/DropdownMenuRadioItem:flex group-data-[state=unchecked]/DropdownMenuRadioItem:hidden dark:text-blue-500"
        />
        <RiCheckboxBlankCircleLine
          aria-hidden="true"
          className="size-full shrink-0 text-gray-300 group-data-[state=unchecked]/DropdownMenuRadioItem:flex group-data-[state=checked]/DropdownMenuRadioItem:hidden dark:text-gray-700"
        />
      </span>
      {children}
      {hint && (
        <span
          className={cn(
            'ml-auto text-sm font-normal text-gray-400 dark:text-gray-600',
          )}
        >
          {hint}
        </span>
      )}
      {shortcut && (
        <span
          className={cn(
            'ml-auto text-sm font-normal tracking-widest text-gray-400 dark:border-gray-800 dark:text-gray-600',
          )}
        >
          {shortcut}
        </span>
      )}
    </DropdownMenuPrimitives.RadioItem>
  );
}
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

function DropdownMenuLabel({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Label> & {
  ref?: React.Ref<React.ElementRef<typeof DropdownMenuPrimitives.Label>>;
}) {
  return (
    <DropdownMenuPrimitives.Label
      ref={ref}
      className={cn(
        // base
        'px-2 py-2 text-xs font-medium tracking-wide',
        // text color
        'text-gray-500 dark:text-gray-500',
        className,
      )}
      {...props}
    />
  );
}
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

function DropdownMenuSeparator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Separator> & {
  ref?: React.Ref<React.ElementRef<typeof DropdownMenuPrimitives.Separator>>;
}) {
  return (
    <DropdownMenuPrimitives.Separator
      ref={ref}
      className={cn(
        '-mx-1 my-1 h-px border-t border-gray-300 dark:border-gray-800',
        className,
      )}
      {...props}
    />
  );
}
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';
const DropdownMenuIconWrapper = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <div
      className={cn(
        // text color
        'text-gray-600 dark:text-gray-400',
        // disabled
        'group-data-disabled/DropdownMenuItem:text-gray-400 dark:group-data-disabled/DropdownMenuItem:text-gray-700',
        className,
      )}
      {...props}
    />
  );
};
DropdownMenuIconWrapper.displayName = 'DropdownMenuIconWrapper';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSubMenuTrigger,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
  DropdownMenuIconWrapper,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
