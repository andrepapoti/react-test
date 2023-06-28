import { useEffect, useRef } from 'react';

export const usePrevious = <T>(value: T) => {
  const previous = useRef<T | undefined>(undefined);

  useEffect(() => {
    previous.current = value;
  });

  return previous.current;
};
