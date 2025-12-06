import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  DatePicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
} from '@repo/ui/components';
import dayjs from 'dayjs';
import { Plus, X } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const dayOffSchema = z.object({
  name: z.string({ required_error: 'Day off name is required' }),
  to: z.date({ required_error: '"to" date is required' }),
  from: z.date({ required_error: '"from" date is required' }),
  repeat: z.boolean().optional(),
  id: z.string().optional(),
});

export type DayOffType = z.infer<typeof dayOffSchema>;

type Props = {
  onAdd: (added: DayOffType) => void;
};

const AddOffDay: React.FC<Props> = ({ onAdd }) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(dayOffSchema),
  });

  const fromDate = form.watch('from');

  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="w-[130px] flex gap-1 mt-4"
          onClick={() => setOpen(true)}
        >
          <Plus className="size-4" /> Add day off
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-90 p-0">
        <Form {...form}>
          <form
            className="grid"
            onSubmit={(event) => {
              event.stopPropagation();
              return form.handleSubmit((values) => {
                onAdd(values);
                setOpen(false);
              })(event);
            }}
          >
            <div className="border-b border-gray-300 p-4 relative">
              <h4 className="leading-none font-bold text-sm">Add day off</h4>
              <Button
                type="button"
                variant="ghost"
                className="size-5.5  rounded-sm  p-0 absolute top-3 right-3 "
                onClick={() => setOpen(false)}
              >
                <X className="text-gray-500" />
              </Button>
            </div>
            <div className="flex flex-col px-4 pt-3 gap-4 border-b border-border">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Day off name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter day off name"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2 pb-4 border-b border-border">
                <Label htmlFor="date" className="text-xs">
                  Date
                </Label>
                <div className="flex justify-between items-center">
                  <FormField
                    control={form.control}
                    name="from"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <DatePicker
                            enableYearNavigation
                            {...field}
                            className="w-36"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <span className="text-xs text-gray-500">to</span>
                  <FormField
                    control={form.control}
                    name="to"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <DatePicker
                            enableYearNavigation
                            {...field}
                            disabledDays={(d) =>
                              fromDate ? dayjs(d).isBefore(fromDate) : false
                            }
                            disabled={!fromDate}
                            className="w-36"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 pb-4">
                <FormField
                  control={form.control}
                  name="repeat"
                  render={({ field }) => (
                    <FormItem className="space-y-0 flex">
                      <FormControl>
                        <Switch
                          ref={field.ref}
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <span className="text-xs whitespace-nowrap font-medium">
                  Repeat this day off yearly
                </span>
              </div>
            </div>
            <div className="py-3 px-4 flex gap-2 justify-end">
              <Button
                type="button"
                variant="secondary"
                className="h-8 w-[100px]"
                // disabled={isPending}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-8 w-[100px]"
                // isLoading={isPending}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default AddOffDay;
