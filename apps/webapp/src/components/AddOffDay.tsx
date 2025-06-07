import { useTRPC } from '@/lib/trpc';
import {
  Button,
  DatePicker,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
} from '@repo/ui/components';
import { useMutation } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function PopoverDemo() {
  const [date1, setDate1] = useState<Date>();
  const [date2, setDate2] = useState<Date>();
  const [repeated, setRepeated] = useState<boolean>(false);
  const [description, setDescription] = useState<string>();

  const [open, setOpen] = useState<boolean>(false);

  const trpc = useTRPC();

  const { mutate, isPending } = useMutation(
    trpc.dayOff.createDayOff.mutationOptions({
      onSuccess: () => {
        toast.success('Successfully added');
        setOpen(false);
      },
    }),
  );

  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Add Day Off
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-90 p-0">
        <div className="grid">
          <div className="border-b border-gray-200 p-4 relative">
            <h4 className="leading-none font-medium text-sm">Add day off</h4>
            <Button
              variant="ghost"
              className="size-5.5  rounded-sm  p-0 absolute top-3 right-3 "
              onClick={() => setOpen(false)}
            >
              <X className="text-gray-500" />
            </Button>
          </div>
          <div className="flex flex-col px-4 pt-3 gap-4 border-b border-border">
            <div className="flex flex-col gap-2">
              <Label htmlFor="description" className="text-xs">
                Day Off Description
              </Label>
              <Input
                placeholder="e.g. New year's eve"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                className="col-span-2 h-9"
              />
            </div>
            <div className="flex flex-col gap-2 pb-4 border-b border-border">
              <Label htmlFor="date" className="text-xs">
                Date
              </Label>
              <div className="flex justify-between items-center">
                <DatePicker
                  value={date1}
                  onChange={setDate1}
                  className="w-36"
                />
                <span className="text-xs text-gray-500">to</span>
                <DatePicker
                  value={date2}
                  onChange={setDate2}
                  className="w-36"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 pb-4">
              <Switch checked={repeated} onCheckedChange={setRepeated} />
              <span className="text-xs whitespace-nowrap font-medium">
                Repeat this day off yearly
              </span>
            </div>
          </div>
          <div className="py-3 px-4 flex gap-2 justify-end">
            <Button
              variant="secondary"
              className="h-8 w-[100px]"
              disabled={isPending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="h-8 w-[100px]"
              isLoading={isPending}
              onClick={() =>
                mutate({
                  from: date1 as Date,
                  name: description as string,
                  to: date2 as Date,
                  repeat: repeated,
                })
              }
            >
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
