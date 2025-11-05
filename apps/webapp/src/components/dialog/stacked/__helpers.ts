import React from 'react';

export const getStackTranslation = (
  currentIndex: number,
  index: number,
  isMobile: boolean,
) => {
  if (isMobile) {
    return {
      '--translation':
        currentIndex > index ? `${(currentIndex - index) * 120}%` : '0%',
    } as React.CSSProperties;
  }

  return {
    '--translation':
      currentIndex > index
        ? `${(currentIndex - index) * 90}%`
        : currentIndex !== 0
          ? '-14%'
          : '0%',
  } as React.CSSProperties;
};
