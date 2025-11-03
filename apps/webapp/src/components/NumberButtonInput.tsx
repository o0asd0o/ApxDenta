import { cn } from '@/lib/utils';
import { Button } from '@repo/ui/components';
import { Minus, Plus } from 'lucide-react';
import React from 'react';

type Props = {
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
};

const NumberButtonInput: React.FC<Props> = ({ value, onChange, className }) => {
  const [quantity, setQuantity] = React.useState(value || 0);

  const handleQuantity = (quantity: number) => {
    if (onChange) {
      onChange(quantity ?? 0);
    }
    setQuantity(quantity);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : Number(e.target.value);
    if (!Number.isNaN(value) && value >= 0) {
      handleQuantity(value);
    }
  };

  return (
    <div className="flex gap-5 bg-accent p-1 items-center rounded-md justify-between w-full">
      <Button
        type="button"
        onClick={() => handleQuantity(Math.max(0, (quantity ?? 0) - 1))}
        variant="secondary"
        className="size-7 p-0 border-none text-gray-500 shadow-sm transition-all duration-50 ease-out active:scale-95 active:bg-gray-50"
      >
        <Minus className="w-4 h-4" />
      </Button>
      <input
        type="text"
        inputMode="numeric"
        value={quantity}
        max={99999}
        onChange={handleInputChange}
        className={cn(
          'max-w-10 text-center font-medium text-sm bg-transparent border-none outline-none focus:ring-0 p-0',
          className,
        )}
      />
      <Button
        type="button"
        onClick={() => handleQuantity((quantity ?? 0) + 1)}
        variant="secondary"
        className="size-7 p-0 border-none text-primary shadow-sm transition-all duration-50 ease-out active:scale-95 active:bg-gray-50"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default NumberButtonInput;
