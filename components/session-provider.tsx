"use client"

import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"
import type { ReactNode } from "react"

type AuthProviderProps = {
  children: ReactNode
  session?: Session | null
  refetchInterval?: number
  refetchOnWindowFocus?: boolean
}

export function AuthProvider({ children, session, refetchInterval, refetchOnWindowFocus }: AuthProviderProps) {
  return (
    <SessionProvider session={session} refetchInterval={refetchInterval} refetchOnWindowFocus={refetchOnWindowFocus}>
      {children}
    </SessionProvider>
  )
}
