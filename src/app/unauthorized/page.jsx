import React from 'react'
import Unauthorized from '@/components/unauthorized'

export const metadata = {
  title: "Unauthorized",
  robots: {
    index: false,
    follow: false,
  },
};

export default function page() {
  return (
    <Unauthorized />
  )
}
