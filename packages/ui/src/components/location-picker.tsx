'use client';

import {
  APIProvider,
  AdvancedMarker,
  Map as GoogleMap,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import type { MapMouseEvent } from '@vis.gl/react-google-maps';
import {
  Crosshair,
  Loader2,
  MapPin,
  MinusIcon,
  PlusIcon,
  X,
} from 'lucide-react';
import * as React from 'react';

import { Button } from '@repo/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/dialog';
import { Input, inputStyles } from '@repo/ui/components/input';
import { cn } from '@repo/ui/lib/utils';

// Types
export interface LocationValue {
  address: string;
  placeId?: string;
  lat: number;
  lng: number;
}

interface LocationPickerProps {
  value?: LocationValue | null;
  onChange?: (location: LocationValue | null) => void;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
  apiKey: string;
  defaultCenter?: { lat: number; lng: number };
  defaultZoom?: number;
}

interface LocationInputProps {
  value?: LocationValue | null;
  onChange?: (location: LocationValue | null) => void;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
  onOpenMap?: () => void;
  suffix?: React.ReactNode;
}

interface LocationMapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value?: LocationValue | null;
  onChange?: (location: LocationValue | null) => void;
  defaultCenter?: { lat: number; lng: number };
  defaultZoom?: number;
  apiKey: string;
}

// Default center (Manila, Philippines)
const DEFAULT_CENTER = { lat: 14.5995, lng: 120.9842 };
const DEFAULT_ZOOM = 13;

// Type definitions for Google Places API
type PlacePrediction = {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
};

// Custom hook for Places Autocomplete
function usePlacesAutocomplete(inputValue: string) {
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const [predictions, setPredictions] = React.useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const autocompleteServiceRef = React.useRef<unknown>(null);

  React.useEffect(() => {
    if (!placesLib) return;
    autocompleteServiceRef.current =
      new // biome-ignore lint/suspicious/noExplicitAny: Google Maps API types
      (placesLib as any).AutocompleteService();
  }, [placesLib]);

  React.useEffect(() => {
    if (!autocompleteServiceRef.current || !inputValue.trim()) {
      setPredictions([]);
      return;
    }

    setIsLoading(true);
    const request = {
      input: inputValue,
      componentRestrictions: { country: 'ph' }, // Restrict to Philippines
    };

    // biome-ignore lint/suspicious/noExplicitAny: Google Maps API callback
    (autocompleteServiceRef.current as any).getPlacePredictions(
      request,
      // biome-ignore lint/suspicious/noExplicitAny: Google Maps API callback
      (results: any, status: string) => {
        setIsLoading(false);
        if (status === 'OK' && results) {
          setPredictions(results);
        } else {
          setPredictions([]);
        }
      },
    );
  }, [inputValue]);

  const getPlaceDetails = React.useCallback(
    async (placeId: string): Promise<LocationValue | null> => {
      if (!placesLib || !map) return null;

      // biome-ignore lint/suspicious/noExplicitAny: Google Maps API types
      const service = new (placesLib as any).PlacesService(map);

      return new Promise((resolve) => {
        service.getDetails(
          {
            placeId,
            fields: ['formatted_address', 'geometry', 'place_id'],
          },
          // biome-ignore lint/suspicious/noExplicitAny: Google Maps API callback
          (result: any, status: string) => {
            if (status === 'OK' && result?.geometry?.location) {
              resolve({
                address: result.formatted_address || '',
                placeId: result.place_id,
                lat: result.geometry.location.lat(),
                lng: result.geometry.location.lng(),
              });
            } else {
              resolve(null);
            }
          },
        );
      });
    },
    [placesLib, map],
  );

  return { predictions, isLoading, getPlaceDetails };
}

// Map Controls Component
function MapControls() {
  const map = useMap();

  const zoomIn = () => map?.setZoom((map.getZoom() || DEFAULT_ZOOM) + 1);
  const zoomOut = () => map?.setZoom((map.getZoom() || DEFAULT_ZOOM) - 1);

  return (
    <aside className="absolute bottom-8 right-4 z-10 flex flex-col gap-2 rounded-lg bg-background p-2 shadow-lg">
      <Button
        variant="ghost"
        className="size-9 p-0"
        onClick={zoomIn}
        type="button"
      >
        <PlusIcon className="size-5" />
        <span className="sr-only">Zoom in</span>
      </Button>
      <Button
        variant="ghost"
        className="size-9 p-0"
        onClick={zoomOut}
        type="button"
      >
        <MinusIcon className="size-5" />
        <span className="sr-only">Zoom out</span>
      </Button>
    </aside>
  );
}

// Current Location Button Component
function CurrentLocationButton({
  onLocate,
  isGeolocating,
  setIsGeolocating,
  currentValue,
  geocoderRef,
  map,
}: {
  onLocate: (location: LocationValue) => void;
  isGeolocating: boolean;
  setIsGeolocating: (value: boolean) => void;
  currentValue?: LocationValue | null;
  // biome-ignore lint/suspicious/noExplicitAny: Google Maps API types
  geocoderRef: React.RefObject<any>;
  // biome-ignore lint/suspicious/noExplicitAny: Google Maps API types
  map: any;
}) {
  const [userLocation, setUserLocation] = React.useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Check if current value matches user's location (within ~100m)
  const isAtCurrentLocation = React.useMemo(() => {
    if (!userLocation || !currentValue) return false;
    const latDiff = Math.abs(userLocation.lat - currentValue.lat);
    const lngDiff = Math.abs(userLocation.lng - currentValue.lng);
    // Approximately 0.001 degrees = ~100m
    return latDiff < 0.001 && lngDiff < 0.001;
  }, [userLocation, currentValue]);

  const handleGetCurrentLocation = React.useCallback(() => {
    if (!navigator.geolocation || isGeolocating) return;

    setIsGeolocating(true);

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setIsGeolocating(false);
    }, 10000); // 10 second timeout

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutId);
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(pos);
        map?.panTo(pos);

        // Reverse geocode to get address
        if (geocoderRef.current) {
          // biome-ignore lint/suspicious/noExplicitAny: Google Maps API callback
          (geocoderRef.current as any).geocode(
            { location: pos },
            // biome-ignore lint/suspicious/noExplicitAny: Google Maps API callback
            (results: any, status: string) => {
              setIsGeolocating(false);
              if (status === 'OK' && results?.[0]) {
                onLocate({
                  address: results[0].formatted_address,
                  placeId: results[0].place_id,
                  lat: pos.lat,
                  lng: pos.lng,
                });
              } else {
                onLocate({
                  address: `${pos.lat.toFixed(6)}, ${pos.lng.toFixed(6)}`,
                  lat: pos.lat,
                  lng: pos.lng,
                });
              }
            },
          );
        } else {
          setIsGeolocating(false);
          onLocate({
            address: `${pos.lat.toFixed(6)}, ${pos.lng.toFixed(6)}`,
            lat: pos.lat,
            lng: pos.lng,
          });
        }
      },
      () => {
        clearTimeout(timeoutId);
        setIsGeolocating(false);
      },
      { timeout: 10000, enableHighAccuracy: false },
    );
  }, [isGeolocating, setIsGeolocating, map, geocoderRef, onLocate]);

  return (
    <aside className="absolute bottom-8 left-4 z-10">
      <Button
        variant="outline"
        className="gap-2 bg-background shadow-lg"
        onClick={handleGetCurrentLocation}
        disabled={isGeolocating || isAtCurrentLocation}
        type="button"
      >
        {isGeolocating ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Crosshair className="size-4" />
        )}
        <span className="text-sm">
          {isAtCurrentLocation ? 'At current location' : 'Current location'}
        </span>
      </Button>
    </aside>
  );
}

// Search Component inside Map Modal
function MapSearch({
  onSelect,
  currentValue,
}: {
  onSelect: (location: LocationValue) => void;
  currentValue?: LocationValue | null;
}) {
  const [query, setQuery] = React.useState(currentValue?.address || '');
  const [isOpen, setIsOpen] = React.useState(false);
  const { predictions, isLoading, getPlaceDetails } =
    usePlacesAutocomplete(query);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lastSelectedRef = React.useRef<string | null>(null);

  // Sync query when currentValue changes (e.g., from map click)
  // but skip if the value matches what we just selected
  React.useEffect(() => {
    if (currentValue?.address) {
      // Only sync if this is a new value from outside (map click)
      // not from our own selection
      if (currentValue.address !== lastSelectedRef.current) {
        setQuery(currentValue.address);
      }
    }
  }, [currentValue?.address]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = async (prediction: PlacePrediction) => {
    const details = await getPlaceDetails(prediction.place_id);
    if (details) {
      lastSelectedRef.current = details.address;
      setQuery(details.address);
      setIsOpen(false);
      onSelect(details);
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute left-4 right-4 top-4 z-10 sm:left-4 sm:right-auto sm:w-[350px]"
    >
      <div className="rounded-lg border bg-background shadow-lg">
        <div className="flex items-center gap-2 px-3 py-2">
          {isLoading ? (
            <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
          ) : (
            <MapPin className="size-4 shrink-0 text-muted-foreground" />
          )}
          <input
            type="text"
            placeholder="Search locations..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              // Clear the last selected ref when user types
              lastSelectedRef.current = null;
            }}
            onFocus={() => {
              setIsOpen(true);
            }}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {query && !isLoading && (
            <X
              className="size-4 shrink-0 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                lastSelectedRef.current = null;
              }}
            />
          )}
        </div>
        {isOpen && query.trim() && (
          <div className="border-t">
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
              </div>
            ) : predictions.length === 0 ? (
              <div className="py-6 text-center">
                <p className="text-sm font-medium">No locations found</p>
                <p className="text-xs text-muted-foreground">
                  Try a different search term
                </p>
              </div>
            ) : (
              <ul className="max-h-60 overflow-y-auto py-1">
                {predictions.map((prediction) => (
                  <li
                    key={prediction.place_id}
                    onClick={() => handleSelect(prediction)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && handleSelect(prediction)
                    }
                    className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-accent"
                  >
                    <div className="rounded-full bg-primary/10 p-1.5">
                      <MapPin className="size-3 text-primary" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="truncate text-sm font-medium">
                        {prediction.structured_formatting.main_text}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {prediction.structured_formatting.secondary_text}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Map Content Component (used inside APIProvider)
function MapContent({
  value,
  onChange,
  defaultCenter = DEFAULT_CENTER,
  defaultZoom = DEFAULT_ZOOM,
}: {
  value?: LocationValue | null;
  onChange?: (location: LocationValue | null) => void;
  defaultCenter?: { lat: number; lng: number };
  defaultZoom?: number;
}) {
  const map = useMap();
  const geocoderRef = React.useRef<unknown>(null);
  const [markerPosition, setMarkerPosition] = React.useState<{
    lat: number;
    lng: number;
  } | null>(value ? { lat: value.lat, lng: value.lng } : null);
  const [isGeolocating, setIsGeolocating] = React.useState(false);
  const initializedRef = React.useRef(false);
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  // Initialize geocoder
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.google?.maps?.Geocoder) {
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, []);

  // Set initial marker position from value
  React.useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      if (value) {
        setMarkerPosition({ lat: value.lat, lng: value.lng });
      }
    }
  }, [value]);

  // Update marker when value changes from search
  React.useEffect(() => {
    if (value) {
      setMarkerPosition({ lat: value.lat, lng: value.lng });
      map?.panTo({ lat: value.lat, lng: value.lng });
    }
  }, [value, map]);

  const handleMapClick = React.useCallback(
    (e: MapMouseEvent) => {
      const detail = e.detail;
      if (!detail?.latLng) return;

      const pos = {
        lat: detail.latLng.lat,
        lng: detail.latLng.lng,
      };
      setMarkerPosition(pos);

      // Reverse geocode
      if (geocoderRef.current) {
        // biome-ignore lint/suspicious/noExplicitAny: Google Maps API callback
        (geocoderRef.current as any).geocode(
          { location: pos },
          // biome-ignore lint/suspicious/noExplicitAny: Google Maps API callback
          (results: any, status: string) => {
            if (status === 'OK' && results?.[0]) {
              onChange?.({
                address: results[0].formatted_address,
                placeId: results[0].place_id,
                lat: pos.lat,
                lng: pos.lng,
              });
            } else {
              onChange?.({
                address: `${pos.lat.toFixed(6)}, ${pos.lng.toFixed(6)}`,
                lat: pos.lat,
                lng: pos.lng,
              });
            }
          },
        );
      }
    },
    [onChange],
  );

  const handleSearchSelect = React.useCallback(
    (location: LocationValue) => {
      setMarkerPosition({ lat: location.lat, lng: location.lng });
      map?.panTo({ lat: location.lat, lng: location.lng });
      onChange?.(location);
    },
    [map, onChange],
  );

  return (
    <>
      <GoogleMap
        defaultCenter={
          value ? { lat: value.lat, lng: value.lng } : defaultCenter
        }
        defaultZoom={defaultZoom}
        gestureHandling="greedy"
        disableDefaultUI
        onClick={handleMapClick}
        mapId="location-picker-map"
        className="h-full w-full"
      >
        {markerPosition && (
          <AdvancedMarker position={markerPosition}>
            <div className="flex size-10 transform cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-200 hover:scale-110">
              <MapPin className="size-5 stroke-[2.5px]" />
            </div>
          </AdvancedMarker>
        )}
      </GoogleMap>
      <MapSearch onSelect={handleSearchSelect} currentValue={value} />
      <MapControls />
      <CurrentLocationButton
        onLocate={handleSearchSelect}
        isGeolocating={isGeolocating}
        setIsGeolocating={setIsGeolocating}
        currentValue={value}
        geocoderRef={geocoderRef}
        map={map}
      />
      {isGeolocating && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80">
          <div className="flex items-center gap-2">
            <Loader2 className="size-5 animate-spin" />
            <span className="text-sm">Getting your location...</span>
          </div>
        </div>
      )}
    </>
  );
}

// Location Input Component
function LocationInput({
  value,
  onChange,
  placeholder = 'Enter location...',
  disabled,
  hasError,
  className,
  onOpenMap,
}: LocationInputProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <Input
        value={value?.address || ''}
        onChange={(e) => {
          if (!e.target.value) {
            onChange?.(null);
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
        hasError={hasError}
        readOnly
        className="cursor-pointer pr-10"
        onClick={onOpenMap}
      />
      <div className="pointer-events-none absolute bottom-0 right-3 flex h-full items-center justify-center">
        <MapPin className="size-4 text-gray-400" />
      </div>
    </div>
  );
}

// Location Map Modal Component
function LocationMapModal({
  open,
  onOpenChange,
  value,
  onChange,
  defaultCenter = DEFAULT_CENTER,
  defaultZoom = DEFAULT_ZOOM,
  apiKey,
}: LocationMapModalProps) {
  const [internalValue, setInternalValue] =
    React.useState<LocationValue | null>(value || null);

  // Sync internal value when external value changes
  React.useEffect(() => {
    setInternalValue(value || null);
  }, [value]);

  const handleConfirm = () => {
    onChange?.(internalValue);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setInternalValue(value || null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[85vh] max-h-[700px] w-[95vw] max-w-3xl flex-col overflow-hidden p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Select Location</DialogTitle>
          <DialogDescription>
            Search for a location or click on the map to select a point
          </DialogDescription>
        </DialogHeader>
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <APIProvider apiKey={apiKey}>
            <MapContent
              value={internalValue}
              onChange={setInternalValue}
              defaultCenter={defaultCenter}
              defaultZoom={defaultZoom}
            />
          </APIProvider>
        </div>
        <DialogFooter className="shrink-0 border-t px-4 py-3">
          <div className="flex w-full items-center justify-between gap-3">
            <p className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
              {internalValue?.address || 'No location selected'}
            </p>
            <div className="flex shrink-0 gap-2">
              <Button variant="outline" onClick={handleCancel} type="button">
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirm}
                disabled={!internalValue}
                type="button"
              >
                Confirm Location
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Main Location Picker Component
function LocationPicker({
  value,
  onChange,
  placeholder = 'Select location...',
  disabled,
  hasError,
  className,
  apiKey,
  defaultCenter = DEFAULT_CENTER,
  defaultZoom = DEFAULT_ZOOM,
}: LocationPickerProps) {
  const [isMapOpen, setIsMapOpen] = React.useState(false);

  return (
    <>
      <LocationInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        hasError={hasError}
        className={className}
        onOpenMap={() => !disabled && setIsMapOpen(true)}
      />
      <LocationMapModal
        open={isMapOpen}
        onOpenChange={setIsMapOpen}
        value={value}
        onChange={onChange}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        apiKey={apiKey}
      />
    </>
  );
}

// Standalone Autocomplete Input (for use cases where only autocomplete is needed)
function LocationAutocompleteContent({
  value,
  onChange,
  placeholder = 'Search location...',
  disabled,
  hasError,
  className,
  suffix,
}: Omit<LocationInputProps, 'onOpenMap'>) {
  const [query, setQuery] = React.useState(value?.address || '');
  const [isOpen, setIsOpen] = React.useState(false);
  const { predictions, isLoading, getPlaceDetails } =
    usePlacesAutocomplete(query);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync query with external value
  React.useEffect(() => {
    if (value?.address) {
      setQuery(value.address);
    }
  }, [value?.address]);

  const handleSelect = async (prediction: PlacePrediction) => {
    const details = await getPlaceDetails(prediction.place_id);
    if (details) {
      onChange?.(details);
      setQuery(details.address);
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            if (!e.target.value) {
              onChange?.(null);
            }
          }}
          onFocus={() => query && setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            inputStyles({ hasError }),
            suffix ? 'pr-16' : 'pr-10',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        />
        <div className="absolute bottom-0 right-0 flex h-full items-center gap-1 pr-3">
          {isLoading ? (
            <Loader2 className="size-4 animate-spin text-gray-400" />
          ) : (
            <MapPin className="size-4 text-gray-400" />
          )}
          {suffix}
        </div>
      </div>
      {isOpen && predictions.length > 0 && (
        <div
          ref={(el) => {
            // Scroll dropdown into view when it appears
            if (el) {
              requestAnimationFrame(() => {
                el.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                });
              });
            }
          }}
          className="absolute z-50 mt-1 w-full rounded-md border bg-background shadow-lg"
        >
          <ul className="max-h-60 overflow-auto py-1">
            {predictions.map((prediction) => (
              <li
                key={prediction.place_id}
                className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-accent"
                onClick={() => handleSelect(prediction)}
                onKeyDown={(e) => e.key === 'Enter' && handleSelect(prediction)}
              >
                <div className="rounded-full bg-primary/10 p-1.5">
                  <MapPin className="size-3 text-primary" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-sm font-medium">
                    {prediction.structured_formatting.main_text}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {prediction.structured_formatting.secondary_text}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Wrapped version with APIProvider
function LocationAutocomplete({
  apiKey,
  ...props
}: Omit<LocationInputProps, 'onOpenMap'> & { apiKey: string }) {
  return (
    <APIProvider apiKey={apiKey}>
      {/* Hidden map for Places API */}
      <div className="hidden">
        <GoogleMap
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={DEFAULT_ZOOM}
          mapId="location-autocomplete-hidden"
        />
      </div>
      <LocationAutocompleteContent {...props} />
    </APIProvider>
  );
}

// Fallback simple input (when Places API fails or is unavailable)
function LocationFallbackInput({
  value,
  onChange,
  placeholder = 'Enter address manually...',
  disabled,
  hasError,
  className,
}: {
  value?: LocationValue | null;
  onChange?: (location: LocationValue | null) => void;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
}) {
  const [address, setAddress] = React.useState(value?.address || '');

  React.useEffect(() => {
    if (value?.address) {
      setAddress(value.address);
    }
  }, [value?.address]);

  const handleBlur = () => {
    if (address.trim()) {
      onChange?.({
        address: address.trim(),
        lat: 0,
        lng: 0,
      });
    } else {
      onChange?.(null);
    }
  };

  return (
    <div className={cn('relative w-full', className)}>
      <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        hasError={hasError}
        className="pr-10"
      />
      <div className="pointer-events-none absolute bottom-0 right-3 flex h-full items-center justify-center">
        <MapPin className="size-4 text-gray-400" />
      </div>
    </div>
  );
}

export {
  LocationPicker,
  LocationAutocomplete,
  LocationFallbackInput,
  LocationInput,
  LocationMapModal,
  type LocationPickerProps,
  type LocationInputProps,
  type LocationMapModalProps,
};
