"use client";

import { Home } from '../components/Home/Home';
import { Header } from '../components/Header/Header';
import { AppShell, Burger, AppShellHeader, AppShellMain } from '@mantine/core';
import { useState } from 'react';

export default function HomePage() {
  const [opened, setOpened] = useState(false);

  const toggle = () => {
    setOpened(!opened);
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShellHeader>
        <Header />
      </AppShellHeader>

      <AppShellMain><Home /></AppShellMain>
    </AppShell>
  );
}
