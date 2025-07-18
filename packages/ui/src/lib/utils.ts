import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const focusInput = [
  // base
  'focus:ring-2',
  // ring color
  'focus:ring-primary-200 focus:dark:ring-primary-700/30',
  // border color
  'focus:border-primary-500 focus:dark:border-primary-700',
];

export const focusWithinInput = [
  // base
  'focus-within:ring-2',
  // ring color
  'focus-within:ring-primary-200 focus-within:dark:ring-primary-700/30',
  // border color
  'focus-within:border-primary-500 focus-within:dark:border-primary-700',
];

// Tremor Raw focusRing [v0.0.1]

export const focusRing = [
  // base
  'outline outline-offset-2 outline-0 focus-visible:outline-2',
  // outline color
  'outline-primary-500 dark:outline-primary-500',
];

// Tremor Raw hasErrorInput [v0.0.1]

export const hasErrorInput = [
  // base
  'ring-2',
  // border color
  'border-red-500 dark:border-red-700',
  // ring color
  'ring-red-200 dark:ring-red-700/30',
];
