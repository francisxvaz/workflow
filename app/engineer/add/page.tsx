'use client'

import AddEngineer from '@/components/AddEngineer'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function page() {
  const router = useRouter();

  return (
    <AddEngineer onComplete={() => router.push('/engineer')} />
  )
}
