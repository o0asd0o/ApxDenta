import { cn } from '@/lib/utils';
import { Button } from '@repo/ui/components';
import { Check } from 'lucide-react';
import React, { type Key } from 'react';

type Props<T> = {
  form: {
    trigger: () => Promise<boolean>;
  };
  stepper: {
    current: {
      id: T;
    };
    goTo: (stepId: T) => void;
    all: {
      id: T;
      icon: React.JSX.Element;
      label: React.ReactNode;
    }[];
  };
  currentIndex: number;
  stepsLength: number;
};

function StepperComponent<T>({
  stepper,
  currentIndex,
  stepsLength,
  form,
}: Props<T>) {
  return (
    <nav aria-label="Checkout Steps" className="group">
      <ol
        className="flex items-center justify-between gap-2 relative"
        aria-orientation="horizontal"
      >
        {stepper.all.map((step, index) => {
          const isSelected = stepper.current.id === step.id;
          return (
            <React.Fragment key={step.id as Key}>
              <li className="flex items-center gap-4 flex-shrink-0 max-w-[50px]">
                <div className="flex flex-col items-center gap-1 w-full">
                  <Button
                    type="button"
                    role="tab"
                    variant={
                      index < currentIndex
                        ? 'success'
                        : index === currentIndex
                          ? undefined
                          : 'secondary'
                    }
                    aria-current={isSelected ? 'step' : undefined}
                    aria-posinset={index + 1}
                    aria-setsize={stepsLength}
                    aria-selected={isSelected}
                    className={cn(
                      'flex size-9 items-center justify-center rounded-full px-2 transition-all duration-150 ease-in shadow-none',
                      index === currentIndex &&
                        'size-7 p-1.5 after:content-[""] after:absolute  after:size-9 after:border after:border-dashed after:border-primary after:rounded-full',
                    )}
                    onClick={async () => {
                      if (currentIndex > index) {
                        return stepper.goTo(step.id);
                      }

                      const valid = await form.trigger();

                      if (!valid) return;

                      if (index - currentIndex > 1) return;
                      stepper.goTo(step.id);
                    }}
                  >
                    {index < currentIndex && <Check />}
                    {index >= currentIndex && step.icon}
                  </Button>
                  <span className="text-[11px] text-gray-300 font-extrabold mt-1">
                    STEP {index + 1}
                  </span>
                  <span className="text-xs font-medium whitespace-nowrap">
                    {step.label}
                  </span>
                </div>
              </li>
              {index < stepsLength - 1 && (
                <div
                  className={cn(
                    'flex flex-1 h-0.5 bg-gray-200 relative -top-5',
                    index < currentIndex && 'bg-green-600',
                    index === currentIndex &&
                      'after:content-[""] after:flex after:h-0.5 after:w-1/2 after:bg-primary',
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export default StepperComponent;
