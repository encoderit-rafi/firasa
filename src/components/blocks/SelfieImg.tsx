"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'
export default function SelfieImg() {
  return (
    <div className="flex-center w-fit mx-auto flex-1 shrink-0 lg:w-1/2 relative">
          <Image src="/selfie.png" alt="selfie" width={544} height={596} />
          <div className='absolute inset-y-[8.5%] right-[24.5%] left-[26.5%] rounded-[24px] overflow-hidden'>

          <motion.div className="absolute top-0 left-0 w-full h-full z-100 pointer-events-none" style={{
              background:
              "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
            }}
            animate={{ y: ["100%", "-100%", "-100%"] }}
            transition={{
                duration: 3,
                repeat: Infinity,
                delay:0.6,
                ease: "linear",
                times: [0, 1/3, 1],
            }}></motion.div>
            </div>
        </div>
  )
}