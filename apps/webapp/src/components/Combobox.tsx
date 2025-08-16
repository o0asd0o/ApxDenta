import { Check, ChevronDown } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components';
import { focusInput } from '@repo/ui/lib/utils';

type Props<T extends string> = {
  items: { value: T; label: React.JSX.Element | string; labelRaw?: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export function Combobox<T extends string>(props: Props<T>) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(props.value);

  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Popover open={open} modal={true} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className={cn(
            'w-full justify-between shadow-xs text-gray-900 border-gray-200 dark:border-gray-800',
            !value && 'text-gray-400',
            focusInput,
          )}
          ref={buttonRef}
        >
          {value
            ? props.items.find((framework) => framework.value === value)?.label
            : props.placeholder || 'Select item...'}
          <ChevronDown
            className={cn(
              'opacity-50 size-5 transition-all duration-200 ease-out',
              open && 'rotate-180',
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0"
        style={{
          width: buttonRef.current?.clientWidth
            ? `${buttonRef.current?.clientWidth}px`
            : undefined,
        }}
      >
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {props.items.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    props.onChange?.(currentValue);
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === framework.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
