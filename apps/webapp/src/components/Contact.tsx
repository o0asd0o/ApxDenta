import React from 'react';

interface Props {
  email?: string;
  phone: string;
}
export const Contact: React.FC<Props> = ({ email, phone }) => {
  return (
    <div className="flex flex-col gap-1">
      <span>{phone}</span>
      {email && (
        <a className="text-blue-700" href={`mailto:${email}`}>
          {email}
        </a>
      )}
      {!email && (
        <span className="text-gray-400 text-xs">
          &lt;not registered yet&gt;
        </span>
      )}
    </div>
  );
};
