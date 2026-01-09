import { type ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

import { Analytics } from '@vercel/analytics/next';

import 'app/globals.css';

import { RelayContextProvider } from 'components/relay-context-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PR Monitor',
  description: 'GitHub code review tool',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme');
  const isDark = theme?.value === 'dark';

  return (
    <html className={isDark ? 'dark' : ''} lang="en" suppressHydrationWarning>
      <link href="code-review.svg" rel="icon" type="image/svg+xml"></link>
      <body className={inter.className}>
        <div className="h-full min-h-screen bg-gray-50 dark:bg-catppuccin-base">
          <RelayContextProvider>{children}</RelayContextProvider>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
