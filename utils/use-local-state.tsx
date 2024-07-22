import { useCallback, useMemo, useState } from 'react';

export default function useLocalState<T>(
  key: string,
  initialValue: T
): readonly [T, (value: T) => void] {
  const localStorage =
    typeof window !== 'undefined' ? window.localStorage : null;
  const item = localStorage?.getItem(key) ?? null;
  const value = item ? JSON.parse(item) : initialValue;
  const [storedValue, setStoredValue] = useState<T>(value);

  const setValue = useCallback(
    (value: T) => {
      setStoredValue((_prevState) => {
        if (value == null) {
          localStorage?.removeItem(key);
        } else {
          localStorage?.setItem(key, JSON.stringify(value));
        }
        return value;
      });
    },
    [key, localStorage]
  );

  return useMemo(
    () => [storedValue, setValue] as const,
    [setValue, storedValue]
  );
}
