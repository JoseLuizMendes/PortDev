'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { SphereStage } from '@/components/intro/SphereStage'
import { IntroFlowActionsProvider } from '@/components/intro/intro-flow-context'
import PreloaderSplashScreen from '@/components/PreloaderSplashScreen'

type Phase = 'cinematic' | 'sphere' | 'content'

interface IntroFlowProps {
  onComplete: () => void
}

export function IntroFlow({ onComplete }: IntroFlowProps) {
  const [phase, setPhase] = useState<Phase>('cinematic')

  // Garante que o fluxo não mostre scrollbars durante a intro
  useEffect(() => {
    if (phase === 'content') {
      // Libera o scroll explicitamente (evita ficar preso em overflow hidden)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      return
    }

    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
    }
  }, [phase])

  const handleCinematicComplete = useCallback(() => {
    setPhase('sphere')
  }, [])

  const handleSphereComplete = useCallback(() => {
    setPhase('content')
    onComplete()
  }, [onComplete])

  const actionsValue = useMemo(
    () => ({ onSphereComplete: handleSphereComplete }),
    [handleSphereComplete]
  )

  return (
    <IntroFlowActionsProvider value={actionsValue}>
      {phase === 'cinematic' && <PreloaderSplashScreen onComplete={handleCinematicComplete} />}
      {phase !== 'content' && <SphereStage active={phase === 'sphere'} />}
    </IntroFlowActionsProvider>
  )
}
