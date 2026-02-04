'use client'

import PreloaderSplashScreen from '@/components/PreloaderSplashScreen'

interface CinematicStageProps {
  onComplete: () => void
}

export function CinematicStage({ onComplete }: CinematicStageProps) {
  return <PreloaderSplashScreen onComplete={onComplete} />
}
