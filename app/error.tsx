'use client';

import { Header } from 'components/header';

type Props = {
  error: Error;
  refresh: () => void;
};

const Error = ({ error, refresh }: Props) => (
  <div className="m-auto flex max-w-3xl flex-col gap-2 p-4">
    <Header hasToken={false} onUpdatedToken={refresh} />
    <p>{error.message}</p>
    <p>{errorSuggestion(error.message)}</p>
  </div>
);

const errorSuggestion = (message: string) =>
  message.includes('Bad credentials') ? 'Try updating your token' : '';

export default Error;
