import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, PropsWithChildren } from 'react'
const percentageTextVariants = cva(
  "text-white",
  {
    variants: {
      variant: {
        default:"text-black",
        low: "text-error",
        moderate: "text-warning",
        high: "text-success",
     
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
export default function PercentageText({children,className,...props}:ComponentProps<"span"> &
  VariantProps<typeof percentageTextVariants>&PropsWithChildren) {
  return (
    <span className={cn(percentageTextVariants(props),className)} {...props}>{
        children
    }%</span>
  )
}
