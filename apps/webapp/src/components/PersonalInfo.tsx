import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components';
import React from 'react';

interface Props {
  name: string;
  role: string;
  id: string;
}
export const PersonalInfo: React.FC<Props> = ({ name, id, role }) => {
  const splitted = name.split(' ');

  return (
    <div className="flex gap-2.5 items-center">
      <Avatar className="size-7">
        <AvatarImage
          src={`https://api.dicebear.com/9.x/identicon/svg?seed=${id}`}
          alt={name.substring(0, 2)}
        />
        <AvatarFallback>{splitted[0][0] + splitted[1][0]}</AvatarFallback>
      </Avatar>
      <div className="flex gap-1 flex-col">
        <span className="text-xs">{name}</span>
        <span className="text-muted-foreground text-xs capitalize">{role}</span>
      </div>
    </div>
  );
};
