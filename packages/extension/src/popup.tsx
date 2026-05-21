import { useMemo } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';

import { DisplayModeProvider } from 'components/display-mode-context';
import { Header } from 'components/header';
import { ReviewPage } from 'components/review-page';
import { createRelayEnvironment } from 'extension/src/relay-env';
import { saveToken as persistToken } from 'extension/src/token-storage';
import { useToken } from 'extension/src/use-token';

export const Popup = () => {
  const { token, setToken, loaded, error } = useToken();
  const env = useMemo(() => createRelayEnvironment(token), [token]);

  return (
    <RelayEnvironmentProvider environment={env}>
      <DisplayModeProvider>
        <div className="flex min-h-[600px] w-[560px] flex-col gap-2 bg-gray-50 p-2 dark:bg-catppuccin-base dark:text-catppuccin-text">
          {!loaded && <div className="p-2">Loading…</div>}
          {error && <div className="p-2 text-catppuccin-red">{error}</div>}
          {loaded && (
            <>
              <Header
                hasToken={!!token}
                saveToken={async (t) => {
                  await persistToken(t);
                  setToken(t);
                }}
              />
              <ReviewPage isLoggedIn={!!token} />
            </>
          )}
        </div>
      </DisplayModeProvider>
    </RelayEnvironmentProvider>
  );
};
