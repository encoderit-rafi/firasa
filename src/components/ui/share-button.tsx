import React, { ComponentProps } from 'react'
import { Button } from './button'
import { Share } from '@/assets/icons'
import { cn } from '@/lib/utils'

export default function ShareButton({className,children,...props}:ComponentProps<typeof Button>) {
  return (<Button variant={"outline"}  className={cn("",className)} {...props}>
            <Share/>
            Share
          </Button>
  )
}
