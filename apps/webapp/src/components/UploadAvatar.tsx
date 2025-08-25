import React, { useState } from 'react';

type Props = {
  name: string;
  onChange?: (file: File | null | string) => void;
  value: File | string | null;
};

export const UploadAvatar: React.FC<Props> = ({ name, onChange, value }) => {
  const [avatar, setAvatar] = useState<string | undefined>(
    value && typeof value !== 'string'
      ? URL.createObjectURL(value as File)
      : value || undefined,
  );

  const imageAvatar = avatar || value;

  return (
    <div className="flex gap-2 items-center">
      <>
        {imageAvatar && (
          <div
            className="size-14 rounded-full bg-cover! border border-gray-300"
            style={{ background: `url('${imageAvatar}')` }}
          />
        )}
        {!imageAvatar && <div className="size-14 bg-gray-200 rounded-full" />}
      </>

      <div className="flex flex-col gap-1.5">
        <div className="flex gap-2 items-center">
          <div className="leading-4">
            <label
              htmlFor={name}
              className="text-primary text-sm cursor-pointer"
            >
              {imageAvatar ? 'Replace' : 'Upload photo'}
            </label>
            <input
              id={name}
              onChange={(event) => {
                if (event.target.files?.[0]) {
                  setAvatar(URL.createObjectURL(event.target.files[0]));
                }

                onChange?.(event.target.files?.[0] as File);
              }}
              className="hidden"
              type="file"
            />
          </div>
          {imageAvatar && (
            <>
              <div className="flex w-[1px] h-4 bg-gray-200 mt-1" />
              <button
                className="text-red-500 text-sm"
                type="button"
                onClick={() => {
                  setAvatar(undefined);
                  onChange?.(null);
                }}
              >
                Remove
              </button>
            </>
          )}
        </div>
        <span className="text-xs text-gray-400 w-[260px] leading-[14px]">
          An image of the person, it's best if it has the same length and height
        </span>
      </div>
    </div>
  );
};
