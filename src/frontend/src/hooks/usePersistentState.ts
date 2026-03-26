import { useCallback, useState } from "react";
import { readStorage, writeStorage } from "../lib/adminStorage";

/**
 * Works exactly like useState but syncs every change to localStorage.
 * On mount it also re-reads localStorage so data is always fresh.
 */
export function usePersistentState<T>(
  key: string,
  fallback: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setStateRaw] = useState<T>(() => readStorage<T>(key, fallback));

  const setState: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (action) => {
      setStateRaw((prev) => {
        const next =
          typeof action === "function"
            ? (action as (prev: T) => T)(prev)
            : action;
        writeStorage(key, next);
        return next;
      });
    },
    [key],
  );

  return [state, setState];
}
