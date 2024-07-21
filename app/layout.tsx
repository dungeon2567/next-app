"use client"

import '@mantine/core/styles.css';
import { Header } from '../components/Header/Header';
import { AppShell, AppShellHeader, AppShellMain, MantineProvider } from '@mantine/core';
import { theme } from '../theme';

import { SessionContextProvider } from '@lib';
import { SWRConfig } from 'swr';
import Head from './head';
import { useState } from 'react';

export default function RootLayout({ children }) {
  const [users, setUsers] = useState([])

  return (
    <html lang="en">
      <Head/>

      <body>
        <SessionContextProvider>
          <SWRConfig
            value={{
              revalidateIfStale: false,
              revalidateOnFocus: false,
            }}
          >
            <MantineProvider theme={theme}>
              <AppShell
                header={{ height: 60 }}
                padding="md"
              >
                <AppShellHeader>
                  <Header />
                </AppShellHeader>

                <AppShellMain>
                    {children}
                </AppShellMain>
              </AppShell>
            </MantineProvider>
          </SWRConfig>
        </SessionContextProvider>
      </body>
    </html>
  );
}
