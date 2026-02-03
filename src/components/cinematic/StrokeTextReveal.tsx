'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface StrokeTextRevealProps {
  text: string
  onComplete?: () => void
  strokeColor?: string
  fillColor?: string
  fontSize?: string
}

export function StrokeTextReveal({
  text,
  onComplete,
  strokeColor = '#c9a227',
  fillColor = '#1a1a1a',
  fontSize = 'clamp(2rem, 8vw, 6rem)',
}: StrokeTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return

    const letters = text.split('')
    const svg = svgRef.current
    
    // Clear previous content
    svg.innerHTML = ''

    // Create text elements for each letter
    const textGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    let currentX = 0
    const letterElements: { stroke: SVGTextElement; fill: SVGTextElement }[] = []

    letters.forEach((letter, index) => {
      // Stroke layer
      const strokeText = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      strokeText.setAttribute('x', `${currentX}`)
      strokeText.setAttribute('y', '50%')
      strokeText.setAttribute('dominant-baseline', 'middle')
      strokeText.setAttribute('font-family', 'var(--font-bebas), sans-serif')
      strokeText.setAttribute('font-size', fontSize)
      strokeText.setAttribute('font-weight', 'bold')
      strokeText.setAttribute('fill', 'none')
      strokeText.setAttribute('stroke', strokeColor)
      strokeText.setAttribute('stroke-width', '2')
      strokeText.setAttribute('stroke-dasharray', '1000')
      strokeText.setAttribute('stroke-dashoffset', '1000')
      strokeText.textContent = letter === ' ' ? '\u00A0' : letter

      // Fill layer
      const fillText = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      fillText.setAttribute('x', `${currentX}`)
      fillText.setAttribute('y', '50%')
      fillText.setAttribute('dominant-baseline', 'middle')
      fillText.setAttribute('font-family', 'var(--font-bebas), sans-serif')
      fillText.setAttribute('font-size', fontSize)
      fillText.setAttribute('font-weight', 'bold')
      fillText.setAttribute('fill', fillColor)
      fillText.setAttribute('opacity', '0')
      fillText.textContent = letter === ' ' ? '\u00A0' : letter

      textGroup.appendChild(strokeText)
      textGroup.appendChild(fillText)

      letterElements.push({ stroke: strokeText, fill: fillText })

      // Calculate width for next letter (approximate)
      const charWidth = letter === ' ' ? 20 : 45
      currentX += charWidth
    })

    svg.appendChild(textGroup)

    // Center the text group
    const totalWidth = currentX
    textGroup.setAttribute('transform', `translate(${(svg.clientWidth - totalWidth) / 2}, 0)`)

    // Create timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out entire text
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete,
        })
      },
    })

    // Animate each letter
    letterElements.forEach(({ stroke, fill }, index) => {
      const delay = index * 0.08

      // Stroke draw
      tl.to(
        stroke,
        {
          strokeDashoffset: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        delay
      )

      // Fill reveal (starts slightly after stroke begins)
      tl.to(
        fill,
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        delay + 0.3
      )

      // Fade stroke after fill is complete
      tl.to(
        stroke,
        {
          opacity: 0.3,
          duration: 0.3,
          ease: 'power2.out',
        },
        delay + 0.5
      )
    })

    // Hold for a moment
    tl.to({}, { duration: 0.8 })

    return () => {
      tl.kill()
    }
  }, [text, strokeColor, fillColor, fontSize, onComplete])

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
    >
      <svg
        ref={svgRef}
        className="w-full h-32 md:h-48"
        viewBox="0 0 800 150"
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  )
}
