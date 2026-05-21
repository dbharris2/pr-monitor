import { useEffect, useState } from 'react';

import { getToken } from 'extension/src/token-storage';

export function useToken() {
  const [token, setToken] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getToken()
      .then((t) => {
        if (cancelled) return;
        setToken(t);
        setLoaded(true);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        console.error('Failed to read token from chrome.storage', e);
        setError(e instanceof Error ? e.message : String(e));
        setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { token, setToken, loaded, error };
}
