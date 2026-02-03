'use client'

/**
 * /sphere
 * 
 * FASE 2: Experiência 3D com Scroll
 * 
 * - Esfera de fragmentos com formação animada
 * - ScrollTrigger controla a entrada na esfera
 * - Ao atingir 100% do scroll: navega para /
 */

import { useRef, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PaperSphere, PaperSphereHandle } from '@/components/cinematic/PaperSphere'
import { SplitNameText } from '@/components/cinematic/SplitNameText'

gsap.registerPlugin(ScrollTrigger)

export default function SpherePage() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollSectionRef = useRef<HTMLDivElement>(null)
  const sphereRef = useRef<PaperSphereHandle>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const hasNavigated = useRef(false)

  // Iniciar formação da esfera ao montar
  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      sphereRef.current?.startFormation()
    })
    return () => cancelAnimationFrame(timer)
  }, [])

  // Navegação para home (executada uma única vez)
  const navigateToHome = useCallback(() => {
    if (hasNavigated.current || isTransitioning) return
    hasNavigated.current = true
    setIsTransitioning(true)

    // Fade out suave antes de navegar
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.1,
      ease: 'power2.inOut',
      onComplete: () => {
        // Cleanup ScrollTrigger
        ScrollTrigger.getAll().forEach(st => st.kill())
        
        // Marcar que veio da experiência cinematográfica
        sessionStorage.setItem('from-cinematic', 'true')
        
        // Navegar para home
        router.push('/#home')
      },
    })
  }, [router, isTransitioning])

  // Configurar ScrollTrigger
  useEffect(() => {
    if (!scrollSectionRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: scrollSectionRef.current,
      start: 'top top',
      end: '+=400%',
      scrub: 1.5,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Atualizar progresso da esfera
        sphereRef.current?.setScrollProgress(self.progress)
      },
      onLeave: () => {
        // 100% do scroll atingido + continua scrollando
        navigateToHome()
      },
    })

    return () => {
      trigger.kill()
    }
  }, [navigateToHome])

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ 
        opacity: 1,
        minHeight: '100vh',
      }}
    >
      {/* Seção de scroll */}
      <div
        ref={scrollSectionRef}
        className="relative"
        style={{ minHeight: '500vh' }}
      >
        {/* Container fixo */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Esfera 3D */}
          <div className="absolute inset-0 z-10">
            <PaperSphere ref={sphereRef} />
          </div>

          {/* Tipografia do nome */}
          <SplitNameText
            firstName="JOSÉ"
            lastName="LUIZ"
            scrollContainerRef={scrollSectionRef}
          />

          {/* Indicador de scroll */}
          <div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 animate-bounce"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transition: 'opacity 0.5s ease',
            }}
          >
            <div className="flex flex-col items-center gap-3 text-slate-600">
              <span className="text-xs tracking-[0.3em] uppercase font-light">
                Scroll
              </span>
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
        </div>
      </div>

      {/* Overlay de transição */}
      {isTransitioning && (
        <div 
          className="fixed inset-0 z-50 bg-black pointer-events-none"
          style={{
            opacity: 0,
            animation: 'fadeIn 0.8s ease-out forwards',
          }}
        />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
