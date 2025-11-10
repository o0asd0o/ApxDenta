// Tremor Radio Card [v1.0.0]

import * as RadioGroupPrimitives from '@radix-ui/react-radio-group';
import React from 'react';

import { cn, focusInput, focusRing } from '@repo/ui/lib/utils';

function RadioCardGroup({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Root> & {
  ref?: React.Ref<React.ComponentRef<typeof RadioGroupPrimitives.Root>>;
}) {
  return (
    <RadioGroupPrimitives.Root
      ref={ref}
      className={cn('grid gap-2', className)}
      tremor-id="tremor-raw"
      {...props}
    />
  );
}

RadioCardGroup.displayName = 'RadioCardGroup';

function RadioCardItem({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Item> & {
  ref?: React.Ref<React.ElementRef<typeof RadioGroupPrimitives.Item>>;
}) {
  return (
    <RadioGroupPrimitives.Item
      ref={ref}
      className={cn(
        // base
        'group relative w-full rounded-md border p-2 text-left shadow-xs transition focus:outline-hidden',
        // background color
        'bg-white dark:bg-gray-950',
        // border color
        'border-gray-300 dark:border-gray-800',
        'data-[state=checked]:border-primary-500',
        'dark:data-[state=checked]:border-primary-500',
        // disabled
        'data-disabled:border-gray-100 dark:data-disabled:border-gray-800',
        'data-disabled:bg-gray-50 data-disabled:shadow-none dark:data-disabled:bg-gray-900',
        focusInput,
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitives.Item>
  );
}

RadioCardItem.displayName = 'RadioCardItem';

function RadioCardIndicator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Indicator> & {
  ref?: React.Ref<React.ElementRef<typeof RadioGroupPrimitives.Indicator>>;
}) {
  return (
    <div
      className={cn(
        // base
        'relative flex size-4 shrink-0 appearance-none items-center justify-center rounded-full border shadow-xs outline-hidden',
        // border color
        'border-gray-300 dark:border-gray-800',
        // background color
        'bg-white dark:bg-gray-950',
        // checked
        'group-data-[state=checked]:border-0 group-data-[state=checked]:border-transparent group-data-[state=checked]:bg-primary-500',
        // disabled
        'group-data-disabled:border-gray-300 group-data-disabled:bg-gray-100 group-data-disabled:text-gray-400',
        'dark:group-data-disabled:border-gray-700 dark:group-data-disabled:bg-gray-800',
        // focus
        focusRing,
        className,
      )}
    >
      <RadioGroupPrimitives.Indicator
        ref={ref}
        className={cn('flex items-center justify-center')}
        {...props}
      >
        <div
          className={cn(
            // base
            'size size-1.5 shrink-0 rounded-full',
            // indicator
            'bg-white',
            // disabled
            'group-data-disabled:bg-gray-400 dark:group-data-disabled:bg-gray-500',
          )}
        />
      </RadioGroupPrimitives.Indicator>
    </div>
  );
}

RadioCardIndicator.displayName = 'RadioCardIndicator';

export { RadioCardGroup, RadioCardIndicator, RadioCardItem };
