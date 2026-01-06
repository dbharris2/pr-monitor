import { cookies } from 'next/headers';

import PrMonitor from 'components/pr-monitor';

export default async function Page() {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has('gh_token');
  return <PrMonitor initialHasToken={hasToken} />;
}