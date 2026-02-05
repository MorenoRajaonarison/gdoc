"use client"

import { Button } from '@/components/ui/button'
import { AlertTriangleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Errorpage = ({error, reset}: {error: Error, reset: () => void}) => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center space-y-6'>
        <div className="text-center space-y-4">
            <div className="flex justify-center">
                <div className="bg-rose-100 p-3 rounded-full">
                    <AlertTriangleIcon className='size-10 text-rose-600'/>
                </div>
            </div>
            <div className="space-y-2">
                <h2 className='text-2xl font-semibold'>Something went wrong</h2>
                <p className='text-muted-foreground'>{error.message}</p>
            </div>
            <div className="flex items-center justify-center gap-x-3">
                <Button onClick={reset} className="btn btn-primary">Try again</Button>
                <Button asChild variant="ghost" onClick={() => {}} className="btn btn-outline"><Link href="/">Go back</Link></Button>
            </div>
        </div>
    </div>
  )
}

export default Errorpage