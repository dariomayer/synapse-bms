// frontend/src/modules/landing/components/animated-background.tsx
import { motion } from 'framer-motion'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 dark:to-primary/3" />

      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <motion.div
        className="absolute top-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/8 to-primary/3 dark:from-primary/5 dark:to-primary/2 blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-primary/6 to-primary/2 dark:from-primary/4 dark:to-primary/1 blur-3xl"
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/70" />
    </div>
  )
}
