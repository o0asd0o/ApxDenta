import { cn } from '@/lib/utils';
import { useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import React from 'react';
import type { ReservationAddSlot } from './__types';
import { HOUR_HEIGHT } from './types';

type Props = {
  id: string;
  top: number;
  addSlot: ReservationAddSlot | null;
  onAddSlot?: (slot: ReservationAddSlot) => void;
};

const ReservationSlotDropTarget: React.FC<Props> = ({
  id,
  top,
  addSlot,
  onAddSlot,
}) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <button
      ref={setNodeRef}
      type="button"
      disabled={!addSlot}
      className={cn(
        'group absolute left-2 right-2 z-[1] rounded-lg overflow-visible focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        !addSlot && 'pointer-events-none',
      )}
      style={{
        top: `${top}px`,
        height: `${HOUR_HEIGHT / 2}px`,
      }}
      onClick={() => {
        if (addSlot) onAddSlot?.(addSlot);
      }}
    >
      {addSlot && (
        <span
          className={cn(
            'flex items-center justify-center rounded-lg border border-dashed border-primary/40 bg-primary/5 text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100',
            isOver && 'opacity-100 bg-primary/10',
          )}
          style={{ height: `${HOUR_HEIGHT - 8}px` }}
        >
          <Plus className="size-5" />
        </span>
      )}
    </button>
  );
};

export default ReservationSlotDropTarget;
