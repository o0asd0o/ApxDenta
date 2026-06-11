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
  searchPlaceholder?: string;
  emptyText?: string;
};

export function Combobox<T extends string>(props: Props<T>) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(props.value);

  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Popover open={open} modal={true} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className={cn(
            'w-full justify-between rounded-sm text-gray-900 border-gray-300 active:scale-100 dark:border-gray-800',
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
          <CommandInput
            placeholder={props.searchPlaceholder || 'Search framework...'}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>
              {props.emptyText || 'No framework found.'}
            </CommandEmpty>
            <CommandGroup>
              {props.items.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.labelRaw ?? framework.value}
                  onSelect={() => {
                    props.onChange?.(framework.value);
                    setValue(framework.value === value ? '' : framework.value);
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
