// Tremor RadioGroup [v1.0.0]

import * as RadioGroupPrimitives from '@radix-ui/react-radio-group';
import React from 'react';

import { cn, focusRing } from '@repo/ui/lib/utils';

function RadioGroup({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Root> & {
  ref?: React.Ref<React.ElementRef<typeof RadioGroupPrimitives.Root>>;
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

RadioGroup.displayName = 'RadioGroup';

function RadioGroupIndicator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Indicator> & {
  ref?: React.Ref<React.ElementRef<typeof RadioGroupPrimitives.Indicator>>;
}) {
  return (
    <RadioGroupPrimitives.Indicator
      ref={ref}
      className={cn('flex items-center justify-center', className)}
      {...props}
    >
      <div
        className={cn(
          // base
          'size-1.5 shrink-0 rounded-full',
          // indicator
          'bg-white',
          // disabled
          'group-data-disabled:bg-gray-400 dark:group-data-disabled:bg-gray-500',
        )}
      />
    </RadioGroupPrimitives.Indicator>
  );
}

RadioGroupIndicator.displayName = 'RadioGroupIndicator';

function RadioGroupItem({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Item> & {
  ref?: React.Ref<React.ElementRef<typeof RadioGroupPrimitives.Item>>;
}) {
  return (
    <RadioGroupPrimitives.Item
      ref={ref}
      className={cn(
        'group relative flex size-4 appearance-none items-center justify-center outline-hidden',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          // base
          'flex size-4 shrink-0 items-center justify-center rounded-full border shadow-xs',
          // border color
          'border-gray-300 dark:border-gray-800',
          // background color
          'bg-white dark:bg-gray-950',
          // checked
          'group-data-[state=checked]:border-0 group-data-[state=checked]:border-transparent group-data-[state=checked]:bg-primary-500',
          // disabled
          'group-data-disabled:border',
          'group-data-disabled:border-gray-300 group-data-disabled:bg-gray-100 group-data-disabled:text-gray-400',
          'dark:group-data-disabled:border-gray-700 dark:group-data-disabled:bg-gray-800',
          // focus
          focusRing,
        )}
      >
        <RadioGroupIndicator />
      </div>
    </RadioGroupPrimitives.Item>
  );
}

RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
