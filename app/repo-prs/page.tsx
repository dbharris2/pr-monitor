import { cookies } from 'next/headers';

import RepoPrsPage from 'components/repo-prs-page';

export default async function Page() {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has('gh_token');
  return <RepoPrsPage initialHasToken={hasToken} />;
}
