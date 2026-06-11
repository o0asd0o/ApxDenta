import { getInitials } from '@/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
} from '@repo/ui/components';
import { X } from 'lucide-react';
import React from 'react';
import type { Patient } from '../../components/types';

type Props = {
  patients: Patient[];
  value?: string;
  selectedPatientId?: string;
  onNameChange: (name: string) => void;
  onPatientSelect: (patient: Patient) => void;
  onPatientClear: () => void;
  placeholder?: string;
};

const MAX_PATIENT_SUGGESTIONS = 3;

type PatientSuggestion = {
  patient: Patient;
  matchIndices: Set<number>;
  score: number;
};

type HighlightedSegment = {
  text: string;
  highlighted: boolean;
  start: number;
};

const getPatientNameMatch = (
  patient: Patient,
  searchValue: string,
): PatientSuggestion | null => {
  const normalizedName = patient.name.toLowerCase();
  const normalizedSearch = searchValue.toLowerCase();
  const exactMatchIndex = normalizedName.indexOf(normalizedSearch);

  if (exactMatchIndex >= 0) {
    const exactMatchIndices =
      normalizedSearch.length === 1
        ? Array.from(normalizedName)
            .map((character, index) =>
              character === normalizedSearch ? index : null,
            )
            .filter((index): index is number => index !== null)
        : Array.from(
            { length: normalizedSearch.length },
            (_, index) => exactMatchIndex + index,
          );

    return {
      patient,
      matchIndices: new Set(exactMatchIndices),
      score: exactMatchIndex,
    };
  }

  const matchIndices: number[] = [];
  let searchIndex = 0;

  for (let nameIndex = 0; nameIndex < normalizedName.length; nameIndex += 1) {
    if (normalizedName[nameIndex] !== normalizedSearch[searchIndex]) continue;

    matchIndices.push(nameIndex);
    searchIndex += 1;

    if (searchIndex === normalizedSearch.length) {
      const matchSpan = matchIndices[matchIndices.length - 1] - matchIndices[0];

      return {
        patient,
        matchIndices: new Set(matchIndices),
        score: normalizedName.length + matchIndices[0] + matchSpan / 100,
      };
    }
  }

  return null;
};

const HighlightedPatientName: React.FC<{
  name: string;
  matchIndices: Set<number>;
}> = ({ name, matchIndices }) => {
  const segments = React.useMemo<HighlightedSegment[]>(() => {
    const nextSegments: HighlightedSegment[] = [];

    for (const [index, character] of Array.from(name).entries()) {
      const highlighted = matchIndices.has(index);
      const previousSegment = nextSegments[nextSegments.length - 1];

      if (previousSegment?.highlighted === highlighted) {
        previousSegment.text += character;
        continue;
      }

      nextSegments.push({
        text: character,
        highlighted,
        start: index,
      });
    }

    return nextSegments;
  }, [name, matchIndices]);

  return (
    <span className="truncate">
      {segments.map((segment) => (
        <span
          key={`${segment.start}-${segment.text}`}
          className={
            segment.highlighted
              ? 'rounded-sm bg-primary/10 font-semibold text-primary'
              : undefined
          }
        >
          {segment.text}
        </span>
      ))}
    </span>
  );
};

const PatientAvatar: React.FC<{ patient: Patient; className?: string }> = ({
  patient,
  className,
}) => {
  return (
    <Avatar className={className ?? 'size-7'}>
      <AvatarImage src={patient.avatar} alt={patient.name} />
      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
        {getInitials(patient.name)}
      </AvatarFallback>
    </Avatar>
  );
};

const PatientNameInput = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      patients,
      value = '',
      selectedPatientId,
      onNameChange,
      onPatientSelect,
      onPatientClear,
      placeholder = 'Search or enter patient name',
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = React.useState(false);
    const selectedPatient = patients.find(
      (patient) => patient.id === selectedPatientId,
    );
    const searchValue = value.trim().toLowerCase();
    const suggestions = React.useMemo(() => {
      if (!searchValue || selectedPatient) return [];

      return patients
        .map((patient) => getPatientNameMatch(patient, searchValue))
        .filter((suggestion): suggestion is PatientSuggestion => !!suggestion)
        .sort((first, second) => {
          if (first.score !== second.score) return first.score - second.score;

          return first.patient.name.localeCompare(second.patient.name);
        })
        .slice(0, MAX_PATIENT_SUGGESTIONS);
    }, [patients, searchValue, selectedPatient]);
    const showSuggestions = focused && suggestions.length > 0;

    return (
      <div ref={ref} className="relative" {...props}>
        {selectedPatient ? (
          <div className="flex min-h-10 w-full items-center justify-between gap-3 rounded-sm border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900">
            <div className="flex min-w-0 items-center gap-3">
              <PatientAvatar patient={selectedPatient} />
              <span className="truncate font-medium">
                {selectedPatient.name}
              </span>
            </div>
            <button
              type="button"
              className="flex size-6 shrink-0 items-center justify-center rounded-sm text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              onClick={onPatientClear}
              aria-label="Remove selected patient"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <>
            <Input
              value={value}
              placeholder={placeholder}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={(event) => onNameChange(event.target.value)}
            />
            {showSuggestions && (
              <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                {suggestions.map(({ patient, matchIndices }) => (
                  <button
                    key={patient.id}
                    type="button"
                    className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => onPatientSelect(patient)}
                  >
                    <PatientAvatar patient={patient} />
                    <HighlightedPatientName
                      name={patient.name}
                      matchIndices={matchIndices}
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  },
);

PatientNameInput.displayName = 'PatientNameInput';

export default PatientNameInput;
