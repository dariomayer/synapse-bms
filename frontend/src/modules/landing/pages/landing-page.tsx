// frontend/src/modules/landing/pages/landing-page.tsx
import { useEffect, useState } from 'react'
import { AnimatedBackground } from '@/modules/landing/components/animated-background'
import { HeroSection } from '@/modules/landing/sections/hero-section'
import { FeaturesSection } from '@/modules/landing/sections/features-section'
import { ProtocolsSection } from '@/modules/landing/sections/protocols-section'
import { RoadmapSection } from '@/modules/landing/sections/roadmap-section'
import { TechStackSection } from '@/modules/landing/sections/tech-stack-section'
import { CTASection } from '@/modules/landing/sections/cta-section'
import { Footer } from '@/modules/app/components/footer'
import { ensureLandingI18n } from '@/modules/landing/i18n'

export function LandingPage() {
  const [i18nReady, setI18nReady] = useState(false)

  useEffect(() => {
    ensureLandingI18n().then(() => setI18nReady(true))
  }, [])

  if (!i18nReady) {
    return null
  }

  return (
    <main className="min-h-dvh flex flex-col items-center relative">
      <AnimatedBackground />
      
      <div className="w-full">
        <HeroSection />
        <FeaturesSection />
        <ProtocolsSection />
        <RoadmapSection />
        <TechStackSection />
        <CTASection />
      </div>

      <Footer />
    </main>
  )
}
