'use client';

import {
  LocationAutocomplete,
  LocationMapModal,
  type LocationValue,
} from '@repo/ui/components/location-picker';
import { cn } from '@repo/ui/lib/utils';
import { Expand } from 'lucide-react';
import * as React from 'react';

interface AddressInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
}

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

export function AddressInput({
  value,
  onChange,
  placeholder = 'Enter address...',
  disabled,
  hasError,
  className,
}: AddressInputProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [locationValue, setLocationValue] =
    React.useState<LocationValue | null>(
      value ? { address: value, lat: 0, lng: 0 } : null,
    );

  // Sync locationValue when value prop changes externally
  React.useEffect(() => {
    if (value && value !== locationValue?.address) {
      setLocationValue((prev) => ({
        address: value,
        lat: prev?.lat || 0,
        lng: prev?.lng || 0,
      }));
    } else if (!value) {
      setLocationValue(null);
    }
  }, [value, locationValue?.address]);

  const handleAutocompleteChange = (location: LocationValue | null) => {
    setLocationValue(location);
    onChange?.(location?.address || '');
  };

  const handleModalChange = (location: LocationValue | null) => {
    setLocationValue(location);
    onChange?.(location?.address || '');
  };

  return (
    <div className={cn('relative w-full', className)}>
      <LocationAutocomplete
        apiKey={API_KEY}
        value={locationValue}
        onChange={handleAutocompleteChange}
        placeholder={placeholder}
        disabled={disabled}
        hasError={hasError}
        suffix={
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            disabled={disabled}
            className="rounded p-0.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Expand className="size-4" />
          </button>
        }
      />

      <LocationMapModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        value={locationValue}
        onChange={handleModalChange}
        apiKey={API_KEY}
      />
    </div>
  );
}

export default AddressInput;
