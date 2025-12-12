'use client'

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export default function SessionsProvider({children}: Props) {
  return (
    <NextAuthSessionProvider>
        {children}
    </NextAuthSessionProvider>
  )
}