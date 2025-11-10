import React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

const context = createContext<{
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  stackCount: number;
  setStackCount?: React.Dispatch<React.SetStateAction<number>>;
}>({ currentIndex: 0, setCurrentIndex: () => {}, stackCount: 0 });

const StackProvider: React.FC<{
  children?: React.JSX.Element;
  stackCount: number;
}> = ({ children, stackCount }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  return (
    <context.Provider value={{ currentIndex, setCurrentIndex, stackCount }}>
      {children}
    </context.Provider>
  );
};

export const useCurrentIndex = () => {
  return useContextSelector(context, (v) => v.currentIndex);
};

export const useCurrentIndexAction = (
  action: 'increment' | 'decrement' | 'set',
  max?: number,
) => {
  const setCurrentIndex = useContextSelector(context, (v) => v.setCurrentIndex);
  return (value?: number) => {
    setCurrentIndex((prev) => {
      if (action === 'set' && typeof value === 'number') return value;

      return action === 'increment'
        ? Math.min(max || 10, prev + 1)
        : Math.max(0, prev - 1);
    });
  };
};

export default StackProvider;
