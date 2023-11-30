"use client"

import { trpc } from '@/app/_trpc/client'
import React from 'react'

type Props = {}

export default function Test({}: Props) {
  const res = trpc.getFile.useMutation({
    onSettled: () => {
      console.log("ooooooo")
    },
  })

  const { data, isLoading } = trpc.hello.useQuery()

  const handleClick = () => {

    const cc = async () => {
      const tt = res.mutate({"key":"hello"})
      return tt
    }

    cc()
  }

  return (
    <>
      <div onClick={handleClick}>Test</div>
      {isLoading && (<p>Loading...</p>)}
      {data && <p>{data}</p>}
    </>
  )
}
