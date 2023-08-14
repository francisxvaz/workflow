import EditJob from '@/components/EditJob'
import React from 'react'

type URL = {
  params: {
    id: string;
  };
  searchParams: string;
};

export default function page(url: URL) {
  return (
    <EditJob jobid={url.params.id} />
    
  )
}
