// frontend/src/modules/landing/components/animated-background.tsx
import { motion } from 'framer-motion'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient con tocco di colore */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/[0.08] dark:to-secondary/[0.05]" />

      {/* Grid pattern minimal */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Blob rosso-arancio top-right */}
      <motion.div
        className="absolute top-[15%] right-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-secondary/[0.12] via-secondary/[0.06] to-transparent dark:from-secondary/[0.08] dark:via-secondary/[0.04] blur-3xl"
        animate={{
          y: [0, -40, 0],
          x: [0, 30, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blob rosso-arancio bottom-left */}
      <motion.div
        className="absolute bottom-[20%] left-[5%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-secondary/[0.10] via-secondary/[0.05] to-transparent dark:from-secondary/[0.07] dark:via-secondary/[0.03] blur-3xl"
        animate={{
          y: [0, 50, 0],
          x: [0, -40, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 6,
        }}
      />

      {/* Accent geometrico sottile */}
      <motion.div
        className="absolute top-[40%] left-[50%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-gradient-to-br from-secondary/[0.08] to-transparent dark:from-secondary/[0.05] blur-2xl"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80" />
    </div>
  )
}
