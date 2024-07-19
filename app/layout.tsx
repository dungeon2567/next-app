"use client";
import '@mantine/core/styles.css';
import { Header } from '../components/Header/Header';
import { AppShell, AppShellHeader, AppShellMain, MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>          <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: false },
          }}
          padding="md"
        >
          <AppShellHeader>
            <Header />
          </AppShellHeader>

          <AppShellMain>{children}</AppShellMain>
        </AppShell></MantineProvider>
      </body>
    </html>
  );
}
