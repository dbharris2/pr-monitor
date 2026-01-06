import { cookies } from 'next/headers';

import PrStatsPage from 'components/pr-stats-page';

export default async function Page() {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has('gh_token');
  return <PrStatsPage initialHasToken={hasToken} />;
}