import { zodResolver } from '@hookform/resolvers/zod';
import { treatmentSchema } from '@repo/schemas';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@repo/ui/components';
import React from 'react';
import { useForm } from 'react-hook-form';

const TreatmentBaseForm: React.FC = () => {
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(treatmentSchema),
  });

  return (
    <Form {...form}>
      <form className="flex divide-y divide-gray-200 flex-col gap-4">
        <div className="pb-4">
          <h2 className="font-medium mb-3">Basic info</h2>
          <div className="flex gap-5 flex-col">
            <FormField
              control={form.control}
              name="treatmentName"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Treatment name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter treatment name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Treatment Category</FormLabel>
                  <FormControl>
                    <RadioCardGroup
                      className="grid-cols-2 text-sm"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <RadioCardItem value="MEDICAL">
                        <div className="flex items-center gap-3">
                          <RadioCardIndicator />
                          <span className="inline-block xs:hidden text-[0.8125rem]">
                            Medical
                          </span>
                          <span className="hidden xs:inline-block">
                            Medical Service
                          </span>
                        </div>
                      </RadioCardItem>
                      <RadioCardItem value="COSMETIC">
                        <div className="flex items-center gap-3">
                          <RadioCardIndicator />
                          <span className="inline-block xs:hidden text-[0.8125rem]">
                            Cosmetic
                          </span>
                          <span className="hidden xs:inline-block">
                            Cosmetic Service
                          </span>
                        </div>
                      </RadioCardItem>
                    </RadioCardGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="relative">
                    Treatment Description{' '}
                    <span className="absolute right-0 top-0 text-xs text-gray-500">
                      {field.value?.length || 0}/300
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      rows={4}
                      {...field}
                      onChange={(e) => {
                        if (e.target.value.length > 300) {
                          e.target.value = e.target.value.slice(0, 300);
                        }
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex bg-gray-50 px-4 py-3 rounded-md items-center relative before:content-[''] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[2px] before:bg-primary before:rounded-full">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm">Set Multiple Visit</h3>
                <span className="text-xs text-gray-400">
                  Allow multiple visits for this treatment
                </span>
              </div>
              <Button className="ml-auto text-primary" variant="ghost">
                Setup
              </Button>
            </div>
          </div>
        </div>
        <div className="pb-4">
          <h2 className="font-medium mb-3">Price & Duration</h2>
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 w-full md:w-4/5 flex-col xs:flex-row">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>Treatment Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        suffix={
                          <span className="text-gray-500 text-sm">/jaw</span>
                        }
                        type="text"
                        icon={<span className="text-gray-500 text-xl">₱</span>}
                        value={
                          field.value ? field.value.toLocaleString('en-US') : ''
                        }
                        onChange={(e) => {
                          const value = e.target.value.replace(/,/g, '');
                          const numValue = Number.parseFloat(value);
                          field.onChange(
                            Number.isNaN(numValue) ? undefined : numValue,
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel className="whitespace-nowrap">
                      Estimated Duration (Hours)
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger className="w-full h-[38px] text-sm">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={'0.5'}>0.5 hours</SelectItem>
                          <SelectItem value={'1'}>1 hour</SelectItem>
                          <SelectItem value={'1.5'}>1.5 hours</SelectItem>
                          <SelectItem value={'2'}>2 hours</SelectItem>
                          <SelectItem value={'2.5'}>2.5 hours</SelectItem>
                          <SelectItem value={'3'}>3 hours</SelectItem>
                          <SelectItem value={'3.5'}>3.5 hours</SelectItem>
                          <SelectItem value={'4'}>4 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="">asd</div>
      </form>
    </Form>
  );
};

export default TreatmentBaseForm;
