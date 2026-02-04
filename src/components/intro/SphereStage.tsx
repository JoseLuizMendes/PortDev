'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { PaperSphere, PaperSphereHandle } from '@/components/cinematic/PaperSphere'
import { SplitNameText, SplitNameTextHandle } from '@/components/cinematic/SplitNameText'
import { useIntroFlowActions } from '@/components/intro/intro-flow-context'

interface SphereStageProps {
  active: boolean
  durationMs?: number
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value))
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

export function SphereStage({ active, durationMs = 5200 }: SphereStageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sphereRef = useRef<PaperSphereHandle>(null)
  const nameRef = useRef<SplitNameTextHandle>(null)
  const bgARef = useRef<HTMLDivElement>(null)
  const bgBRef = useRef<HTMLDivElement>(null)

  const actions = useIntroFlowActions()

  const onCompleteRef = useRef<(() => void) | null>(null)
  const completedRef = useRef(false)

  const progressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const touchStartYRef = useRef<number | null>(null)

  const backgroundStyle = useMemo(() => {
    return {
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    } as const
  }, [])

  // Mantém sempre a referência mais recente sem forçar reinicialização da timeline
  useEffect(() => {
    onCompleteRef.current = actions?.onSphereComplete ?? null
  }, [actions])

  const applyProgress = useCallback((progress: number) => {
    const p = clamp01(progress)
    progressRef.current = p

    sphereRef.current?.setScrollProgress(p)
    nameRef.current?.setProgress(p)

    // Crossfade mais longo e com curva perceptual (reduz a sensação de troca brusca)
    const blend = smoothstep(0.05, 0.98, p)
    const cross = Math.pow(blend, 2.2)
    gsap.set(bgARef.current, { opacity: 1 - cross })
    gsap.set(bgBRef.current, { opacity: cross })

    if (p >= 0.999 && !completedRef.current) {
      completedRef.current = true
      onCompleteRef.current?.()
    }
  }, [])

  // Inicialização quando a esfera fica ativa
  useEffect(() => {
    if (!active) return

    completedRef.current = false
    progressRef.current = 0
    targetProgressRef.current = 0

    // Estado inicial de opacidade (sem flicker)
    gsap.set(containerRef.current, { opacity: 1 })
    gsap.set(bgARef.current, { opacity: 1 })
    gsap.set(bgBRef.current, { opacity: 0 })

    // Iniciar formação
    sphereRef.current?.startFormation()

    // Garantir frame inicial
    applyProgress(0)
  }, [active, applyProgress])

  // O scroll do usuário dirige o progresso (sem scroll real/sem scrollbar)
  useEffect(() => {
    if (!active) return

    const animateToTarget = () => {
      const current = progressRef.current
      const target = targetProgressRef.current
      const next = current + (target - current) * 0.1
      applyProgress(next)

      if (Math.abs(target - next) > 0.0005) {
        rafRef.current = requestAnimationFrame(animateToTarget)
      } else {
        rafRef.current = null
      }
    }

    const kickRAF = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(animateToTarget)
    }

    // Sensibilidade: maior durationMs => precisa de mais scroll para completar
    // Quanto maior o multiplicador, mais o usuário precisa scrollar.
    const scrollDistanceMultiplier = 3
    const baseSensitivity = 0.0036 * (5200 / Math.max(1000, durationMs))
    const sensitivity = Math.max(0.00035, baseSensitivity / scrollDistanceMultiplier)

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (completedRef.current) return
      targetProgressRef.current = clamp01(targetProgressRef.current + e.deltaY * sensitivity)
      kickRAF()
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) touchStartYRef.current = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (completedRef.current) return
      const startY = touchStartYRef.current
      if (startY == null || e.touches.length === 0) return

      const currentY = e.touches[0].clientY
      const delta = startY - currentY
      touchStartYRef.current = currentY

      targetProgressRef.current = clamp01(targetProgressRef.current + delta * sensitivity)
      kickRAF()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [active, durationMs, applyProgress])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40"
      style={{
        overflow: 'hidden',
        width: '100vw',
        height: '100svh',
        opacity: active ? 1 : 0,
        // evita scrollbars em alguns browsers
        touchAction: 'none',
      }}
    >
      {/* Background A (original) */}
      <div
        ref={bgARef}
        className="absolute inset-0"
        style={{
          ...backgroundStyle,
          backgroundImage: "url('/bg_Sphere.svg')",
          opacity: 1,
          willChange: 'opacity',
          transition: 'opacity 140ms linear',
        }}
      />

      {/* Background B (inverso) */}
      <div
        ref={bgBRef}
        className="absolute inset-0"
        style={{
          ...backgroundStyle,
          backgroundImage: "url('/bg2_Sphere.svg')",
          opacity: 0,
          willChange: 'opacity',
          transition: 'opacity 140ms linear',
        }}
      />

      {/* Conteúdo da esfera */}
      <div className="absolute inset-0">
        <PaperSphere ref={sphereRef} />
        <SplitNameText ref={nameRef} firstName="JOSÉ" lastName="LUIZ" />
      </div>
    </div>
  )
}
