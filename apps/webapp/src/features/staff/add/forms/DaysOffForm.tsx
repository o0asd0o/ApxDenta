import AddDayOff from '@/components/AddOffDay';
import DayOffCheckCard from '@/components/DayOffCheckCard';
import { useTRPC } from '@/lib/trpc';
import { slugify } from '@/lib/utils';
import type { DayOffsFormType } from '@repo/schemas';
import {
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Label,
  Loader,
} from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useAdditionalDayOff } from '../context/context';

type Props = {
  form: UseFormReturn<DayOffsFormType>;
};
export const DaysOffForm: React.FC<Props> = ({ form }) => {
  const trpc = useTRPC();

  const { data: defaultDayOffList, isLoading } = useQuery(
    trpc.dayOff.getAllDayOffs.queryOptions({
      defaultOnly: true,
    }),
  );

  const [additionDayOff, setAdditinalDayOff] = useAdditionalDayOff();

  const combiledList = React.useMemo(() => {
    const mainList = defaultDayOffList?.data || [];
    const additional = (additionDayOff || []).map((item) => ({
      ...item,
      id: item.id || slugify(item.name),
    }));
    return [...mainList, ...additional];
  }, [defaultDayOffList, additionDayOff]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 h-30 items-center justify-center">
        <Loader className="[&>svg]:size-[50px] [&>svg]:text-gray-300" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <FormField
        control={form.control}
        name="dayOffs"
        render={({ field }) => {
          const list = combiledList;

          return (
            <>
              <FormItem className="px-3 py-2">
                <FormControl>
                  <Label
                    htmlFor="select-all"
                    className="cursor-pointer flex items-center gap-2 w-fit"
                  >
                    <Checkbox
                      checked={
                        list.length === (field?.value || []).length
                          ? true
                          : (field?.value?.length || 0) > 0
                            ? 'indeterminate'
                            : false
                      }
                      id="select-all"
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? list.map((i) => i.id) : []);
                      }}
                    />
                    <span> Select all</span>
                  </Label>
                </FormControl>
              </FormItem>
              <FormItem className="flex flex-col">
                <FormControl>
                  <div className="flex flex-col gap-2">
                    {list.map((item) => {
                      const current = (field.value || []).find(
                        (i) => i === item.id,
                      );
                      return (
                        <DayOffCheckCard
                          key={item.id}
                          item={item}
                          checked={!!current}
                          onCheckedChange={(name, checked) => {
                            const currentSelections = (field.value || []).slice(
                              0,
                            );

                            const selectionsAdded = [
                              ...currentSelections,
                              name,
                            ];
                            const selectionsFiltered = currentSelections.filter(
                              (i) => i !== name,
                            );

                            const newSelections = checked
                              ? selectionsAdded
                              : selectionsFiltered;

                            field.onChange(newSelections);
                          }}
                        />
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          );
        }}
      />
      <AddDayOff
        onAdd={(added) => {
          setAdditinalDayOff((prev) => [...prev, added]);
          form.setValue(
            'extraDaysCount',
            (form.getValues('extraDaysCount') || 0) + 1,
          );
          const currentSelected = form.getValues('dayOffs') || [];
          form.setValue('dayOffs', [...currentSelected, slugify(added.name)]);
        }}
      />
    </div>
  );
};
