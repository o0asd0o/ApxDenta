import { Button, Input } from '@repo/ui/components';
import { Plus } from 'lucide-react';

export const SearchBox = () => {
  return (
    <div className="max-w-[340px] flex gap-2">
      <Input
        placeholder="Search for anything here..."
        type="search"
        className="w-full"
        inputClassName="shadow-none rounded-full bg-[#F5F6FA]"
      />
      <Button className="size-10! px-2 rounded-full">
        <Plus />
      </Button>
    </div>
  );
};
