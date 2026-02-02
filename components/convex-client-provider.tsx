"use client";

import { ConvexReactClient, Unauthenticated, Authenticated, AuthLoading } from "convex/react"
import { ReactNode } from "react";
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { SignIn, SignOutButton, useAuth } from '@clerk/clerk-react'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <Authenticated>
        {children}
      </Authenticated>
      <Unauthenticated>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <SignIn />
        </div>
      </Unauthenticated>
      <AuthLoading>
        <p>Loading...</p>
      </AuthLoading>
    </ConvexProviderWithClerk>
  )
}