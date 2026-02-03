'use client'

import { useRef, useEffect, RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SplitNameTextProps {
  firstName: string
  lastName: string
  scrollContainerRef: RefObject<HTMLDivElement | null>
}

export function SplitNameText({
  firstName,
  lastName,
  scrollContainerRef,
}: SplitNameTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const firstNameRef = useRef<HTMLDivElement>(null)
  const lastNameRef = useRef<HTMLDivElement>(null)
  const firstLettersRef = useRef<HTMLSpanElement[]>([])
  const lastLettersRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!scrollContainerRef.current || !containerRef.current) return
    if (!firstNameRef.current || !lastNameRef.current) return

    const ctx = gsap.context(() => {
      // Timeline principal vinculada ao scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 1.5, // Mais suave
        },
      })

      // FASE 1: Resistência inicial (0-30% do scroll)
      // O texto resiste, apenas leve tremor
      
      // FASE 2: Letter-spacing aumenta (30-50%)
      tl.to(
        firstNameRef.current,
        {
          letterSpacing: '0.15em',
          duration: 0.3,
        },
        0.3
      )
      tl.to(
        lastNameRef.current,
        {
          letterSpacing: '0.15em',
          duration: 0.3,
        },
        0.3
      )

      // FASE 3: Separação lateral (50-80%)
      tl.to(
        firstNameRef.current,
        {
          x: '-60vw',
          opacity: 0.3,
          letterSpacing: '0.3em',
          duration: 0.4,
          ease: 'power2.in',
        },
        0.5
      )
      tl.to(
        lastNameRef.current,
        {
          x: '60vw',
          opacity: 0.3,
          letterSpacing: '0.3em',
          duration: 0.4,
          ease: 'power2.in',
        },
        0.5
      )

      // FASE 4: Fade out final (80-100%)
      tl.to(
        [firstNameRef.current, lastNameRef.current],
        {
          opacity: 0,
          duration: 0.2,
        },
        0.8
      )

    }, containerRef)

    return () => ctx.revert()
  }, [scrollContainerRef])

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none overflow-hidden"
      style={{ paddingBottom: 'clamp(2rem, 8vh, 6rem)' }}
    >
      <div className="flex items-center justify-center gap-[2vw]">
        {/* Primeiro nome */}
        <div
          ref={firstNameRef}
          className="text-[18vw] font-black leading-[0.85] tracking-tight select-none"
          style={{
            fontFamily: 'var(--font-bebas), Impact, sans-serif',
            color: '#1a1a1a',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            // Sombra sutil para profundidade
            textShadow: '0 2px 20px rgba(0,0,0,0.1)',
          }}
        >
          {firstName.split('').map((letter, i) => (
            <span
              key={i}
              ref={el => { if (el) firstLettersRef.current[i] = el }}
              className="inline-block"
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Segundo nome */}
        <div
          ref={lastNameRef}
          className="text-[18vw] font-black leading-[0.85] tracking-tight select-none"
          style={{
            fontFamily: 'var(--font-bebas), Impact, sans-serif',
            color: '#1a1a1a',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            textShadow: '0 2px 20px rgba(0,0,0,0.1)',
          }}
        >
          {lastName.split('').map((letter, i) => (
            <span
              key={i}
              ref={el => { if (el) lastLettersRef.current[i] = el }}
              className="inline-block"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
