import { type ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import 'app/globals.css';

import RelayContextProvider from 'components/relay-context-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PR Monitor',
  description: 'GitHub code review tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <link href="code-review.svg" rel="icon" type="image/svg+xml"></link>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) { console.error(e); }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="h-full min-h-screen bg-gray-50 dark:bg-catppuccin-base">
          <RelayContextProvider>{children}</RelayContextProvider>
        </div>
      </body>
    </html>
  );
}
