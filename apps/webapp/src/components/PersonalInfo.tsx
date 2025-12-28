import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components';
import React from 'react';

interface Props {
  name: string;
  role?: string;
  id: string;
  profile: string;
}
export const PersonalInfo: React.FC<Props> = ({ name, role, profile }) => {
  const splitted = name.split(' ');

  return (
    <div className="flex gap-2.5 items-center">
      <Avatar className="size-7">
        <AvatarImage
          src={`${import.meta.env.VITE_PUBLIC_CDN_URL}${profile}`}
          alt={name.substring(0, 2)}
        />
        <AvatarFallback className="bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold">
          {[splitted[0][0], splitted[1][0]].join('').toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex gap-1 flex-col">
        <span className="text-xs">{name}</span>
        {role && (
          <span className="text-muted-foreground text-xs capitalize">
            {role}
          </span>
        )}
      </div>
    </div>
  );
};
