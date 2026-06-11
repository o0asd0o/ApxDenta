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
import type { OralHygieneHabitsFormValues } from '../../components/__types';

type Props = {
  form: UseFormReturn<OralHygieneHabitsFormValues>;
};

const answerOptions = {
  lastDentalVisit: [
    ['LESS_THAN_3_MONTHS', '< 3 months ago'],
    ['LESS_THAN_6_MONTHS', '< 6 months ago'],
    ['A_YEAR_AGO', 'About a year ago'],
    ['DONT_REMEMBER', "Don't remember"],
  ],
  dentalCareStart: [
    ['TEENAGER', 'As a teenager'],
    ['ABOUT_20', 'Around 20 y/o'],
    ['ABOUT_30', 'Around 30 y/o'],
    ['AFTER_30', 'After 30 y/o'],
  ],
  washTeethFrequency: [
    ['NEVER', 'Never'],
    ['ONCE', 'Once'],
    ['TWICE', 'Twice'],
    ['MORE_THAN_THRICE', '3+ times'],
  ],
  oralHygieneDuration: [
    ['AROUND_1_MINUTE', '~1 minute'],
    ['ABOUNT_2_MINUTES', '~2 minutes'],
    ['MORE_THAN_2_MINUTES', '> 2 minutes'],
    ['I_DONT_KNOW', "I don't know"],
  ],
  changeToothBrushFrequency: [
    ['EVERY_3_MONTHS', 'Every 3 months'],
    ['EVERY_6_MONTHS', 'Every 6 months'],
    ['EVERY_YEAR', 'Every year'],
    ['AS_OCCUR', 'As needed'],
  ],
} as const;

export const OralHygieneHabitsForm: React.FC<Props> = ({ form }) => {
  return (
    <div className="flex flex-col gap-6">
      <FormField
        control={form.control}
        name="lastDentalVisit"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-sm font-semibold">
              1. When was your last dental visit?
            </FormLabel>
            <FormControl>
              <RadioCardGroup
                className="grid-cols-2 text-sm"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {answerOptions.lastDentalVisit.map(([value, label]) => (
                  <RadioCardItem key={value} value={value}>
                    <div className="flex items-center gap-3">
                      <RadioCardIndicator />
                      <span>{label}</span>
                    </div>
                  </RadioCardItem>
                ))}
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
            <FormLabel className="text-sm font-semibold">
              2. When did you start dental care?
            </FormLabel>
            <FormControl>
              <RadioCardGroup
                className="grid-cols-2 text-sm"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {answerOptions.dentalCareStart.map(([value, label]) => (
                  <RadioCardItem key={value} value={value}>
                    <div className="flex items-center gap-3">
                      <RadioCardIndicator />
                      <span>{label}</span>
                    </div>
                  </RadioCardItem>
                ))}
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
            <FormLabel className="text-sm font-semibold">
              3. How often do you brush your teeth daily?
            </FormLabel>
            <FormControl>
              <RadioCardGroup
                className="grid-cols-2 text-sm"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {answerOptions.washTeethFrequency.map(([value, label]) => (
                  <RadioCardItem key={value} value={value}>
                    <div className="flex items-center gap-3">
                      <RadioCardIndicator />
                      <span>{label}</span>
                    </div>
                  </RadioCardItem>
                ))}
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
            <FormLabel className="text-sm font-semibold">
              4. How long do you brush your teeth?
            </FormLabel>
            <FormControl>
              <RadioCardGroup
                className="grid-cols-2 text-sm"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {answerOptions.oralHygieneDuration.map(([value, label]) => (
                  <RadioCardItem key={value} value={value}>
                    <div className="flex items-center gap-3">
                      <RadioCardIndicator />
                      <span>{label}</span>
                    </div>
                  </RadioCardItem>
                ))}
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
            <FormLabel className="text-sm font-semibold">
              5. How often do you change your toothbrush?
            </FormLabel>
            <FormControl>
              <RadioCardGroup
                className="grid-cols-2 text-sm"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {answerOptions.changeToothBrushFrequency.map(
                  ([value, label]) => (
                    <RadioCardItem key={value} value={value}>
                      <div className="flex items-center gap-3">
                        <RadioCardIndicator />
                        <span>{label}</span>
                      </div>
                    </RadioCardItem>
                  ),
                )}
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
            <FormLabel className="text-sm font-semibold">
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
            <FormLabel className="text-sm font-semibold">
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
