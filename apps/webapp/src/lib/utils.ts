import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date | null | string) => {
  if (!date) return null;
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getInitials = (
  firstNameOrFullName: string,
  lastName?: string,
): string => {
  if (lastName) {
    return `${firstNameOrFullName[0] || ''}${lastName[0] || ''}`.toUpperCase();
  }
  return firstNameOrFullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const slugify = (_string: string): string => {
  let str = _string;
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
  return str;
};

export const urlToFile = async (imageUrl: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_PUBLIC_CDN_URL}${imageUrl}`,
  );
  const blob = await response.blob();
  return new File([blob], 'image.jpg', { type: blob.type });
};

export const extractFileIdFromUrl = (imageUrl: string) => {
  const olderAvatarUrl = imageUrl.replace(
    `${import.meta.env.VITE_PUBLIC_CDN_URL}`,
    '',
  );

  return olderAvatarUrl;
};
