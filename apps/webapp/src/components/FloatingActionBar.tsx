import { cn } from '@/lib/utils';
import { Button, useSidebar } from '@repo/ui/components';
import { ArchiveIcon } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

type Props = {
  selectedCount: number;
  onDelete: () => Promise<void>;
  onClear: () => void;
};

const FloatingActionBar: React.FC<Props> = ({
  selectedCount,
  onDelete,
  onClear,
}) => {
  const { isMobile, open } = useSidebar();
  const [deleting, setDeleting] = useState<boolean>(false);

  if (selectedCount === 0) return null;

  return (
    <div
      className={cn(
        'fixed bottom-6 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-2 duration-200',
        !isMobile && open && 'left-[calc((100%_+_264px)_*_1/2)]',
        !isMobile && !open && 'left-[calc((100%_+_64px)_*_1/2)]',
        isMobile && 'left-1/2',
      )}
    >
      <div className="bg-background border rounded-lg shadow-lg px-4 py-3 flex items-center gap-3">
        <span className="text-xs md:text-sm font-medium whitespace-nowrap">
          {selectedCount} item{selectedCount > 1 ? 's' : ''} selected
        </span>
        <div className="flex items-center gap-2">
          <Button
            className="h-8 text-xs md:text-sm"
            variant="outline"
            onClick={onClear}
          >
            Clear
          </Button>
          <Button
            className="h-8 text-xs md:text-sm"
            variant="destructive"
            isLoading={deleting}
            loadingText="Deleting..."
            onClick={async () => {
              setDeleting(true);
              await onDelete();
              setDeleting(false);
            }}
          >
            <ArchiveIcon className="h-4 w-4 mr-1" />
            Archive
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FloatingActionBar;
