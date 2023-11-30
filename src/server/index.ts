import { publicProcedure, router } from './trpc'
import { TRPCError } from '@trpc/server'

import { z } from 'zod'

export const appRouter = router({
  getContacts: publicProcedure.query(async () => {
    return "kkkk"
  }),
  addContact: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string(),
      phone: z.string()
     }))
    .mutation(async (opts) => {

      console.log(opts.input)

      return true
    }),
})

export type AppRouter = typeof appRouter