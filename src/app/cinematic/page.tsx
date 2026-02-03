'use client'

/**
 * /cinematic
 * 
 * FASE 1: Intro SVG Preloader
 * 
 * - Exibe animação cinematográfica do preloader.svg
 * - Bloqueia interação durante a animação
 * - Ao finalizar: navega para /sphere
 */

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import PreloaderSplashScreen from '@/components/PreloaderSplashScreen'

export default function CinematicIntroPage() {
  const router = useRouter()

  // Bloquear scroll durante a intro
  useEffect(() => {
    // Pré-carregar a próxima rota enquanto a animação roda (reduz o “gap” no final).
    router.prefetch('/sphere')

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [router])

  // Callback quando preloader termina
  const handlePreloaderComplete = () => {
    router.push('/sphere')
  }

  return (
    <PreloaderSplashScreen onComplete={handlePreloaderComplete} />
  )
}
