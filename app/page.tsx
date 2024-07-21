"use client";

import { useQuery } from '@supabase-cache-helpers/postgrest-swr';
import { Home } from '../components/Home/Home';
import { supabaseClient } from '@lib';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [id, setId] = useState(1);

  const { data } = useQuery(
    supabaseClient
      .from("test")
      .select("id,created_at")
      .eq("id", id),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if(data){
      setId(2);
    }
  }, data);

  debugger;

  return <>
    <Home />
  </>
}
