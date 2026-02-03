'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { StrokeTextReveal } from './StrokeTextReveal'
import { PaperSphere, PaperSphereHandle } from './PaperSphere'
import { SplitNameText } from './SplitNameText'

gsap.registerPlugin(ScrollTrigger)

interface CinematicIntroProps {
  onComplete?: () => void
  introText?: string
  firstName?: string
  lastName?: string
}

type Phase = 'intro' | 'forming' | 'ready' | 'scrolling' | 'complete'

export function CinematicIntro({
  onComplete,
  introText = "Nascido para brilhar",
  firstName = "JOSÉ",
  lastName = "LUIZ",
}: CinematicIntroProps) {
  const [phase, setPhase] = useState<Phase>('forming')
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollSectionRef = useRef<HTMLDivElement>(null)
  const sphereRef = useRef<PaperSphereHandle>(null)

  // Esconder scrollbar (apenas a barra, não o scroll)
  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'hide-scrollbar'
    style.textContent = `
      ::-webkit-scrollbar { width: 0 !important; background: transparent !important; }
      html { scrollbar-width: none; -ms-overflow-style: none; }
    `
    document.head.appendChild(style)
    
    return () => {
      const styleEl = document.getElementById('hide-scrollbar')
      if (styleEl) styleEl.remove()
    }
  }, [])

  // Iniciar formação automaticamente
  useEffect(() => {
    if (phase === 'forming') {
      sphereRef.current?.startFormation()
      setTimeout(() => {
        setPhase('ready')
      }, 3000)
    }
  }, [phase])

  // Callback: intro textual completa (não usado no momento)
  const handleIntroComplete = useCallback(() => {
    setPhase('forming')
  }, [])

  // Callback: scroll completo
  const handleScrollComplete = useCallback(() => {
    setPhase('complete')
    onComplete?.()
  }, [onComplete])

  // ScrollTrigger
  useGSAP(() => {
    if (phase !== 'ready' && phase !== 'scrolling') return
    if (!scrollSectionRef.current) return

    setPhase('scrolling')

    const trigger = ScrollTrigger.create({
      trigger: scrollSectionRef.current,
      start: 'top top',
      end: '+=400%',
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        sphereRef.current?.setScrollProgress(self.progress)
      },
      // onLeave: handleScrollComplete, // Desabilitado para teste
    })

    return () => {
      trigger.kill()
    }
  }, { dependencies: [phase], scope: containerRef })

  // Desabilitado para teste
  // if (phase === 'complete') {
  //   return null
  // }

  return (
    <div 
      ref={containerRef} 
      className="relative"
      style={{ 
        // Esconder qualquer overflow horizontal
        overflowX: 'hidden',
        maxWidth: '100vw',
      }}
    >
      {/* ===== FASE 1: INTRO TEXTUAL ===== */}
      {phase === 'intro' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: '#f5f5f0' }}
        >
          <StrokeTextReveal
            text={introText}
            onComplete={handleIntroComplete}
          />
        </div>
      )}

      {/* ===== FASE 2-4: ESFERA + SCROLL ===== */}
      {phase !== 'intro' && (
        <div
          ref={scrollSectionRef}
          className="relative"
          style={{ 
            minHeight: '500vh',
            overflowX: 'hidden',
          }}
        >
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            {/* Esfera 3D */}
            <div className="absolute inset-0 z-10">
              <PaperSphere ref={sphereRef} />
            </div>

            {/* Tipografia */}
            <SplitNameText
              firstName={firstName}
              lastName={lastName}
              scrollContainerRef={scrollSectionRef}
            />

            {/* Indicador de scroll */}
            {(phase === 'ready' || phase === 'forming') && (
              <div 
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 transition-opacity duration-1000"
                style={{ opacity: phase === 'ready' ? 1 : 0 }}
              >
                <div className="flex flex-col items-center gap-3 text-slate-600 animate-bounce">
                  <span className="text-xs tracking-[0.3em] uppercase font-light">Scroll</span>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5"
                  >
                    <path d="M12 5v14M5 12l7 7 7-7"/>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
