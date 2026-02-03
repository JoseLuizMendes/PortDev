'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

/**
 * PreloaderSplashScreen
 * 
 * Animação cinematográfica usando o SVG de public/preloader.svg
 * 
 * Técnica:
 * - Carrega o SVG inline
 * - Anima stroke com stroke-dashoffset + getTotalLength()
 * - Revela fill via clipPath
 * - Stagger orgânico
 */

interface PreloaderSplashScreenProps {
  onComplete?: () => void
}

export default function PreloaderSplashScreen({ onComplete }: PreloaderSplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgContainerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [svgLoaded, setSvgLoaded] = useState(false)

  // Mantém a sensação “cinemática”, mas encurta a troca de rota ao final.
  const EXIT_FADE_DURATION = 0.25

  // Carregar SVG inline e ajustar para cobrir toda a tela
  useEffect(() => {
    fetch('/Group%2019.svg')
      .then(res => res.text())
      .then(svgText => {
        if (svgContainerRef.current) {
          svgContainerRef.current.innerHTML = svgText
          
          // Ajustar SVG para cobrir toda a tela
          const svg = svgContainerRef.current.querySelector('svg')
          if (svg) {
            // Preencher a viewport inteira e alinhar quinas com quinas.
            // Observação: como a viewport raramente tem a mesma proporção 84:51,
            // isso pode distorcer levemente o SVG. É o único jeito de NÃO cortar
            // e NÃO deixar barras, mantendo as quinas no lugar.
            svg.removeAttribute('width')
            svg.removeAttribute('height')
            svg.style.width = '100%'
            svg.style.height = '102%'
            svg.style.display = 'block'
            svg.style.position = 'absolute'
            svg.style.inset = '0'
            svg.style.overflow = 'hidden'
            svg.setAttribute('preserveAspectRatio', 'none')
          
          }
          
          setSvgLoaded(true)
        }
      })
  }, [])

  useGSAP(() => {
    if (!svgLoaded || !svgContainerRef.current) return

    const svg = svgContainerRef.current.querySelector('svg')
    if (!svg) return

    // Encontrar todos os paths com fill (não são stroke-only)
    const allPaths = svg.querySelectorAll('path')
    const fillPaths: SVGPathElement[] = []
    const strokePaths: SVGPathElement[] = []

    allPaths.forEach(path => {
      const fill = path.getAttribute('fill')
      const d = path.getAttribute('d')
      
      // Ignorar o background retangular
      if (d?.includes('M0.201538 0.144775H100.202V50.1448')) return
      
      if (fill && fill !== 'none') {
        fillPaths.push(path as SVGPathElement)
      }
    })

    // Criar paths de stroke duplicados para animação
    fillPaths.forEach((fillPath, index) => {
      const strokePath = fillPath.cloneNode(true) as SVGPathElement
      strokePath.setAttribute('fill', 'none')
      strokePath.setAttribute('stroke', '#c9a227')
      strokePath.setAttribute('stroke-width', '0.3')
      strokePath.setAttribute('stroke-linecap', 'round')
      strokePath.setAttribute('stroke-linejoin', 'round')
      strokePath.classList.add('stroke-path')
      
      // Inserir antes do fillPath
      fillPath.parentNode?.insertBefore(strokePath, fillPath)
      strokePaths.push(strokePath)

      // Criar clipPath para revelar o fill
      const clipId = `reveal-clip-${index}`
      const defs = svg.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs')
      if (!svg.querySelector('defs')) svg.insertBefore(defs, svg.firstChild)

      const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath')
      clipPath.setAttribute('id', clipId)
      
      const clipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      clipRect.setAttribute('x', '0')
      clipRect.setAttribute('y', '0')
      clipRect.setAttribute('width', '0')
      clipRect.setAttribute('height', '60')
      clipRect.classList.add('clip-rect')
      
      clipPath.appendChild(clipRect)
      defs.appendChild(clipPath)
      
      fillPath.setAttribute('clip-path', `url(#${clipId})`)
    })

    // Configurar estado inicial dos strokes
    strokePaths.forEach(path => {
      const length = path.getTotalLength()
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      })
    })

    // Esconder fills inicialmente
    fillPaths.forEach(path => {
      gsap.set(path, { opacity: 0 })
    })

    // Timeline principal
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: EXIT_FADE_DURATION,
          ease: 'power2.inOut',
          onComplete: () => {
            setIsVisible(false)
            onComplete?.()
          },
        })
      },
    })

    // Fade in do container
    tl.to(containerRef.current, { opacity: 1, duration: 0.3 })

    // Animar cada path com stagger orgânico
    strokePaths.forEach((strokePath, i) => {
      const fillPath = fillPaths[i]
      const clipRect = svg.querySelector(`#reveal-clip-${i} rect`)
      strokePath.getTotalLength()
      
      // Stagger orgânico
      const baseDelay = i * 0.06
      const noise = Math.sin(i * 3.7) * 0.03
      const delay = 0.3 + baseDelay + noise

      // 1️⃣ STROKE: desenhar contorno
      tl.to(
        strokePath,
        {
          strokeDashoffset: 0,
          duration:1,
          ease: 'power2.inOut',
        },
        delay
      )

      // 2️⃣ FILL: revelar (começa em 60% do stroke)
      tl.to(
        fillPath,
        {
          opacity: 1,
          duration: 1,
        },
        delay
      )

      if (clipRect) {
        tl.to(
          clipRect,
          {
            attr: { width: 120 },
            duration: 3,
            ease: 'power3.out',
          },
          delay
        )
      }

      // 3️⃣ STROKE: reduzir opacidade
      tl.to(
        strokePath,
        {
          opacity: 0.2,
          duration: 1,
          ease: 'power2.out',
        },
        delay
      )
    })

  }, { dependencies: [svgLoaded], scope: containerRef })

  if (!isVisible) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 opacity-0"
      style={{ 
        overflow: 'hidden',
        margin: '0',
        padding: '0',
        backgroundColor: '#0F2F3A',
        height: '100svh',
      }}
    >
      <div
        ref={svgContainerRef}
        className="fixed inset-0 w-screen"
        style={{
          margin: 0,
          padding: 0,
          height: '100svh',
        }}
      />

      {/* Subtítulo */}
      <div 
        className="absolute inset-x-0 bottom-[25%] px-4 text-center"
        style={{
          opacity: 0,
          animation: svgLoaded ? 'fadeInUp 0.6s ease-out 1.8s forwards' : 'none',
        }}
      >
        <p className="text-sm tracking-[0.25em] uppercase text-slate-500 font-light">
          Desenvolvedor Full Stack
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(15px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </div>
  )
}
