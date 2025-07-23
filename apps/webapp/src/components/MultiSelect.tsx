import { cn } from '@/lib/utils';
import {
  Badge,
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@repo/ui/components';
import { focusWithinInput } from '@repo/ui/lib/utils';
import { noop } from '@tanstack/react-table';
import { Command as CommandPrimitive } from 'cmdk';
import { Loader2, XIcon } from 'lucide-react';
import * as React from 'react';
import { useCallback, useMemo } from 'react';

type Item<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  items: Item<T>[];
  onSelect: (value: T) => void;
  onUnselect: (value: T) => void;
  selectedKeys?: T[];
  loading?: boolean;
  placeholder?: string;
};

function MultiSelect<T extends string>({
  items,
  onSelect,
  onUnselect,
  selectedKeys = [],
  placeholder,
  loading,
}: Props<T>) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && selectedKeys.length > 0 && !inputValue) {
        onUnselect(selectedKeys[selectedKeys.length - 1]);
      }
    },
    [selectedKeys, inputValue, onUnselect],
  );

  const filteredItems = useMemo(
    () => items.filter((item) => !selectedKeys.includes(item.value)),
    [selectedKeys, items],
  );

  const selectedItems = useMemo(
    () => items.filter((item) => selectedKeys.includes(item.value)),
    [selectedKeys, items],
  );

  return (
    <div className="w-full">
      <Command className="overflow-visible">
        <div
          className={cn(
            'rounded-md border border-input px-3 py-2 text-sm transition',
            focusWithinInput,
          )}
        >
          <div className="flex flex-wrap gap-1 relative">
            {selectedItems.map((item) => {
              return (
                <Badge
                  asChild
                  key={item.value}
                  variant="outline"
                  className="select-none"
                >
                  <div className="flex items-center gap-1">
                    {item.label}
                    <span
                      onKeyUp={noop}
                      onClick={() => {
                        onUnselect?.(item.value);
                      }}
                    >
                      <XIcon className="size-3 transition-colors text-muted-foreground hover:text-foreground ml-2 cursor-pointer" />
                    </span>
                  </div>
                </Badge>
              );
            })}
            <CommandPrimitive.Input
              onKeyDown={handleKeyDown}
              onValueChange={setInputValue}
              disabled={loading}
              value={inputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={placeholder || 'Select items...'}
              className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
            {loading && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2">
                <Loader2 className="size-4 animate-spin" />
              </span>
            )}
          </div>
        </div>
        <div className="relative">
          <CommandList className="overflow-auto">
            {open && !!filteredItems.length && (
              <div className="max-h-[300px] overflow-auto absolute! top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
                <CommandGroup className="h-full overflow-auto">
                  {filteredItems.map((item) => {
                    return (
                      <CommandItem
                        key={item.value}
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                        onSelect={() => {
                          setInputValue('');
                          onSelect?.(item.value);
                        }}
                        className={'cursor-pointer'}
                      >
                        {item.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </div>
            )}
          </CommandList>
        </div>
      </Command>
    </div>
  );
}

export default MultiSelect;
