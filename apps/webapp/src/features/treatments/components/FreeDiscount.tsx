import { Input, Label, RadioGroup, RadioGroupItem } from '@repo/ui/components';
import React from 'react';

type Value = {
  type: 'TOTALLY_FREE' | 'FREE_UP_TO';
  amount?: number;
};

type Props = {
  value?: Value;
  onChange?: (value: Value) => void;
};

const FreeDiscount: React.FC<Props> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = React.useState<Value | undefined>(value);
  return (
    <div className="flex gap-2 items-center h-9.5">
      <RadioGroup
        className="flex gap-2"
        value={value?.type}
        onValueChange={(type) => {
          const typeValue = (type || localValue?.type || 'TOTALLY_FREE') as
            | 'TOTALLY_FREE'
            | 'FREE_UP_TO';

          const amountValue = typeValue === 'FREE_UP_TO' ? 0 : undefined;

          setLocalValue({ type: typeValue, amount: amountValue });
          onChange?.({ type: typeValue, amount: amountValue });
        }}
      >
        <div className="flex items-center gap-x-3">
          <RadioGroupItem value="TOTALLY_FREE" id="radio_1" />
          <Label htmlFor="radio_1" className="cursor-pointer">
            Totally free
          </Label>
        </div>
        <div className="flex items-center gap-x-3">
          <RadioGroupItem value="FREE_UP_TO" id="radio_2" />
          <Label htmlFor="radio_2" className="cursor-pointer">
            Free up to
          </Label>
        </div>
      </RadioGroup>
      {localValue?.type === 'FREE_UP_TO' && (
        <Input
          className="w-20"
          type="number"
          min={0}
          value={localValue?.amount}
          onChange={(e) => {
            const value = e.target.value;
            setLocalValue((prev) => ({
              type: prev?.type || 'TOTALLY_FREE',
              amount: value ? Number(value) : undefined,
            }));
            onChange?.({
              type: localValue?.type || 'TOTALLY_FREE',
              amount: value ? Number(value) : undefined,
            });
          }}
        />
      )}
    </div>
  );
};

export default FreeDiscount;
