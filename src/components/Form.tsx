"use client"

import { trpc } from '@/app/_trpc/client'
import React, { useState, FormEvent, ChangeEvent } from 'react'

type Props = {}

type FormData = {
  name: string,
  email: string,
  phone: string
}

export default function Form({}: Props) {
  const [formData, setFormData] = useState<FormData>({name: "", email: "", phone: ""})

  const  { data, isLoading } = trpc.getContacts.useQuery()


  const addContact = trpc.addContact.useMutation({
    onSettled: () => {
      console.log("ooooooo")
    },
  })

  const onInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({...prev, [`${e.target.id}`] : e.target.value}))
  }

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      addContact.mutate(formData)
    } catch (error) {
      console.log("my-error", error)
    }
    
  }

  return (
    <div className='border p-4'>
      <form onSubmit={handleSubmit} className='w-full flex flex-col gap-2'>
        <div>
          <label htmlFor='name' className='text-xs font-semibold mb-1'>Name</label>
          <input type="text" id="name" onChange={onInputChange} className='w-full border border-slate-300 text-sm p-1 rounded-sm focus:outline-none' />
        </div>
        <div>
          <label htmlFor='email' className='text-xs font-semibold mb-1'>Email</label>
          <input type="email" id="email" onChange={onInputChange} className='w-full border border-slate-300 text-sm p-1 rounded-sm focus:outline-none' />
        </div>
        <div>
          <label htmlFor='phone' className='text-xs font-semibold mb-1'>Phone</label>
          <input type="text" id="phone" onChange={onInputChange} className='w-full border border-slate-300 text-sm p-1 rounded-sm focus:outline-none' />
        </div>
        <button className='bg-cyan-600 p-2 font-semibold text-sm text-white rounded-sm my-4'>Add Contact</button>
      </form>
    </div>
  )
}