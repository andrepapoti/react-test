import { useRef } from 'react';

type StorageType<T> = {
  value: T;
  deps?: readonly unknown[];
};

export const useMyMemo = <T>(fn: () => T, deps?: readonly unknown[]) => {
  const storage = useRef<StorageType<T>>({
    value: fn(),
    deps,
  });

  const { value, deps: internalDeps } = storage.current;
  if (!internalDeps) return value;
  if (!deps || internalDeps.length !== deps.length)
    throw Error(`Dependency array length changed`);

  let areDependenciesEqual = true;
  internalDeps.forEach((dep, index) => {
    if (dep !== deps[index]) areDependenciesEqual = false;
  });

  if (!areDependenciesEqual) storage.current.value = fn();

  return storage.current.value;
};
