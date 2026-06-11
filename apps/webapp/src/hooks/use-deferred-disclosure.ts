import { useCallback, useEffect, useRef, useState } from 'react';

export function useDeferredDisclosure<T>(delay = 300) {
  const [value, setValue] = useState<T | null>(null);
  const [open, setOpenState] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (!closeTimer.current) return;
    clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  const show = useCallback(
    (nextValue: T) => {
      clearCloseTimer();
      setValue(nextValue);
      setOpenState(true);
    },
    [clearCloseTimer],
  );

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      setOpenState(nextOpen);
      clearCloseTimer();

      if (!nextOpen) {
        closeTimer.current = setTimeout(() => setValue(null), delay);
      }
    },
    [clearCloseTimer, delay],
  );

  return { open, setOpen, show, value };
}
