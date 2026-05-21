import { cookies } from 'next/headers';

import { saveToken } from 'app/actions/token';
import { PrMonitor } from 'components/pr-monitor';

export default async function Page() {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has('gh_token');
  return <PrMonitor initialHasToken={hasToken} saveToken={saveToken} />;
}
