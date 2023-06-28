import { useMemo } from 'react';

export const useMyCallback = <T>(fn: T, deps?: readonly unknown[]) => {
  const callback = useMemo(() => fn, deps);

  return callback;
};
