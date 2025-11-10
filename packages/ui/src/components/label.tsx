// Tremor Label [v0.0.2]

import * as LabelPrimitives from '@radix-ui/react-label';
import React from 'react';

import { cn } from '@repo/ui/lib/utils';

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitives.Root> {
  disabled?: boolean;
}

function Label({
  className,
  disabled,
  ref,
  ...props
}: LabelProps & {
  ref?: React.Ref<React.ElementRef<typeof LabelPrimitives.Root>>;
}) {
  return (
    <LabelPrimitives.Root
      ref={ref}
      className={cn(
        // base
        'text-sm leading-none',
        // text color
        'text-gray-900 dark:text-gray-50',
        // disabled
        {
          'text-gray-400 dark:text-gray-600': disabled,
        },
        className,
      )}
      aria-disabled={disabled}
      tremor-id="tremor-raw"
      {...props}
    />
  );
}

Label.displayName = 'Label';

export { Label };
