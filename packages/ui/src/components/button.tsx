// Tremor Button [v0.2.0]

import { Slot } from '@radix-ui/react-slot';
import { RiLoader2Fill } from '@remixicon/react';
import React from 'react';
import { type VariantProps, tv } from 'tailwind-variants';

import { cn, focusRing } from '@repo/ui/lib/utils';

const buttonVariants = tv({
  base: [
    // base
    'relative inline-flex items-center justify-center whitespace-nowrap rounded-md border px-3 py-2 text-center text-sm font-medium transition-all duration-150 ease-in-out',
    // pressed/active
    'active:scale-[0.96]',
    // disabled
    'disabled:pointer-events-none disabled:shadow-none disabled:cursor-not-allowed',
    // focus
    focusRing,
  ],
  variants: {
    variant: {
      success: [
        // border
        'border-transparent',
        // text color
        'text-white dark:text-white',
        // background color
        'bg-green-600 dark:bg-green-600',
        // hover color
        'hover:bg-green-700 dark:hover:bg-green-700 hover:shadow-md',
        // focus color
        'focus-visible:ring-2 focus-visible:ring-green-500/50 focus-visible:ring-offset-2',
        // disabled
        'disabled:bg-green-400 disabled:text-white',
        'disabled:dark:bg-green-800 disabled:dark:text-green-500',
      ],
      primary: [
        // border
        'border-transparent',
        // text color
        'text-white dark:text-white',
        // background color
        'bg-primary-500 dark:bg-primary-500',
        // hover color
        'hover:bg-primary-600 dark:hover:bg-primary-600 hover:shadow-md',
        // focus color
        'focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2',
        // disabled
        'disabled:bg-primary-300 disabled:text-white',
        'disabled:dark:bg-primary-800 disabled:dark:text-primary-400',
      ],
      secondary: [
        // border
        'border-primary-200 dark:border-primary-800',
        // text color
        'text-primary-500 dark:text-primary-50',
        // background color
        'bg-white dark:bg-gray-950',
        // hover color
        'hover:bg-primary-50 dark:hover:bg-gray-900/60 hover:border-primary-300 dark:hover:border-primary-700',
        // focus color
        'focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2',
        // disabled
        'disabled:text-primary-400',
        'disabled:dark:text-primary-600',
      ],
      light: [
        // base
        'shadow-none',
        // border
        'border-transparent',
        // text color
        'text-gray-900 dark:text-gray-50',
        // background color
        'bg-gray-200 dark:bg-gray-900',
        // hover color
        'hover:bg-gray-300/70 dark:hover:bg-gray-800/80 hover:shadow-sm',
        // focus color
        'focus-visible:ring-2 focus-visible:ring-gray-400/50 focus-visible:ring-offset-2',
        // disabled
        'disabled:bg-gray-100 disabled:text-gray-400',
        'disabled:dark:bg-gray-800 disabled:dark:text-gray-600',
      ],
      outline: [
        'border border-input bg-background',
        // hover
        'hover:bg-accent hover:text-accent-foreground hover:border-accent-foreground/20',
        // focus
        'focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2',
      ],
      ghost: [
        // base
        'shadow-none',
        // border
        'border-transparent',
        // text color
        'text-gray-900 dark:text-gray-50',
        // hover color
        'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800/80',
        // focus color
        'focus-visible:ring-2 focus-visible:ring-gray-400/50 focus-visible:ring-offset-2',
        // disabled
        'disabled:text-gray-400',
        'disabled:dark:text-gray-600',
      ],
      destructive: [
        // text color
        'text-white',
        // border
        'border-transparent',
        // background color
        'bg-red-600 dark:bg-red-700',
        // hover color
        'hover:bg-red-700 dark:hover:bg-red-600 hover:shadow-md',
        // focus color
        'focus-visible:ring-2 focus-visible:ring-red-500/50 focus-visible:ring-offset-2',
        // disabled
        'disabled:bg-red-300 disabled:text-white',
        'disabled:dark:bg-red-950 disabled:dark:text-red-400',
      ],
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface ButtonProps
  extends React.ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

function Button({
  asChild,
  isLoading = false,
  loadingText,
  className,
  disabled,
  variant,
  children,
  ref,
  ...props
}: ButtonProps & {
  ref?: React.Ref<HTMLButtonElement> | React.LegacyRef<HTMLButtonElement>;
}) {
  const Component = asChild ? Slot : 'button';
  return (
    <Component
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      ref={ref as any}
      className={cn(buttonVariants({ variant }), className)}
      disabled={disabled || isLoading}
      tremor-id="tremor-raw"
      {...props}
    >
      {isLoading ? (
        <span className="pointer-events-none flex shrink-0 items-center justify-center gap-1.5">
          <RiLoader2Fill
            className="size-4 shrink-0 animate-spin"
            aria-hidden="true"
          />
          <span className="sr-only">
            {loadingText ? loadingText : 'Loading'}
          </span>
          {loadingText ? loadingText : children}
        </span>
      ) : (
        children
      )}
    </Component>
  );
}

Button.displayName = 'Button';

export { Button, buttonVariants, type ButtonProps };
