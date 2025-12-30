import type { PatientOralHygieneFormType } from '@repo/schemas';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from '@repo/ui/components';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';

type Props = {
  // biome-ignore lint/suspicious/noExplicitAny: Flexible form type for create/update
  form: UseFormReturn<PatientOralHygieneFormType, any, any>;
};

const OralHygieneForm: React.FC<Props> = ({ form }) => {
  return (
    <div className="flex flex-col gap-6">
      <FormField
        control={form.control}
        name="lastDentalVisit"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-sm font-bold">
              1. When was your last dental visit?
            </FormLabel>
            <FormControl>
              <RadioCardGroup
                className="grid-cols-2 text-sm"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <RadioCardItem value="LESS_THAN_3_MONTHS">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>&lt; 3 months ago</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="LESS_THAN_6_MONTHS">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>&lt; 6 months ago</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="A_YEAR_AGO">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>About a year ago</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="DONT_REMEMBER">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>Don't remember</span>
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
        name="dentalCareStart"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-sm font-bold">
              2. When did you start dental care?
            </FormLabel>
            <FormControl>
              <RadioCardGroup
                className="grid-cols-2 text-sm"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <RadioCardItem value="TEENAGER">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>As a teenager</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="ABOUT_20">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>Around 20 y/o</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="ABOUT_30">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>Around 30 y/o</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="AFTER_30">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>After 30 y/o</span>
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
        name="washTeethFrequency"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-sm font-bold">
              3. How often do you brush your teeth daily?
            </FormLabel>
            <FormControl>
              <RadioCardGroup
                className="grid-cols-2 text-sm"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <RadioCardItem value="NEVER">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>Never</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="ONCE">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>Once</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="TWICE">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>Twice</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="MORE_THAN_THRICE">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>3+ times</span>
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
        name="oralHygieneDuration"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-sm font-bold">
              4. How long do you brush your teeth?
            </FormLabel>
            <FormControl>
              <RadioCardGroup
                className="grid-cols-2 text-sm"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <RadioCardItem value="AROUND_1_MINUTE">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>~1 minute</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="ABOUNT_2_MINUTES">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>~2 minutes</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="MORE_THAN_2_MINUTES">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>&gt; 2 minutes</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="I_DONT_KNOW">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>I don't know</span>
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
        name="changeToothBrushFrequency"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-sm font-bold">
              5. How often do you change your toothbrush?
            </FormLabel>
            <FormControl>
              <RadioCardGroup
                className="grid-cols-2 text-sm"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <RadioCardItem value="EVERY_3_MONTHS">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>Every 3 months</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="EVERY_6_MONTHS">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>Every 6 months</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="EVERY_YEAR">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>Every year</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="AS_OCCUR">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>As needed</span>
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
        name="usingMouthWash"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-sm font-bold">
              6. Do you use mouthwash?
            </FormLabel>
            <FormControl>
              <RadioCardGroup
                className="grid-cols-2 text-sm"
                onValueChange={(value) => field.onChange(value === 'YES')}
                defaultValue={field.value ? 'YES' : 'NO'}
              >
                <RadioCardItem value="YES">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>Yes</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="NO">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>No</span>
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
        name="usingDentalFloss"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-sm font-bold">
              7. Do you use dental floss?
            </FormLabel>
            <FormControl>
              <RadioCardGroup
                className="grid-cols-2 text-sm"
                onValueChange={(value) => field.onChange(value === 'YES')}
                defaultValue={field.value ? 'YES' : 'NO'}
              >
                <RadioCardItem value="YES">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>Yes</span>
                  </div>
                </RadioCardItem>
                <RadioCardItem value="NO">
                  <div className="flex items-center gap-3">
                    <RadioCardIndicator />
                    <span>No</span>
                  </div>
                </RadioCardItem>
              </RadioCardGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default OralHygieneForm;
