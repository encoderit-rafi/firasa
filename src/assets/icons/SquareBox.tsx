import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

export  function SquareBox({className,...props}:ComponentProps<'div'>) {
  return (
    <div className={cn("size-4 bg-error-container shrink-0",className)} {...props} />
  )
}
