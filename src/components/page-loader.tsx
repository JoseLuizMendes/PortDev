'use client'

import { useState, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function PreloaderSplashScreen({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const [done, setDone] = useState(false)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          setDone(true)
          onComplete?.()
        },
      })

      // 1️⃣ Fade in do fundo
      tl.to(containerRef.current, { opacity: 1, duration: 0.8 })

      // 2️⃣ Revelar o texto — simulando "pintura" com mask
      tl.fromTo(
        textRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.8 },
        '-=0.3'
      )

      // 3️⃣ Brilho passando por cima (efeito de luz)
      tl.fromTo(
        textRef.current,
        { filter: 'brightness(1)' },
        { filter: 'brightness(2)', duration: 0.4, yoyo: true, repeat: 1 },
        '-=1'
      )

      // 4️⃣ Fade-out do preloader (curtain reveal)
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        onComplete: () => setDone(true),
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  if (done) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f8f6f2] opacity-0"
    >
      <h1
        ref={textRef}
        className="text-5xl md:text-7xl font-extrabold tracking-wide text-[#b89b5d] select-none"
        style={{
          fontFamily: `'Bebas Neue', sans-serif`,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        Jose Luiz
      </h1>
    </div>
  )
}
