'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(ScrollTrigger, Draggable)

interface GsapScrollRevealProps {
  children: ReactNode
  className?: string
  animation?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleUp' | 'rotateIn'
  duration?: number
  delay?: number
  stagger?: number
  scrub?: boolean | number
  once?: boolean
}

export function GsapScrollReveal({
  children,
  className = '',
  animation = 'fadeUp',
  duration = 1,
  delay = 0,
  stagger = 0.1,
  scrub = false,
  once = false,
}: GsapScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const animations = {
      fadeUp: { from: { opacity: 0, y: 60 }, to: { opacity: 1, y: 0 } },
      fadeDown: { from: { opacity: 0, y: -60 }, to: { opacity: 1, y: 0 } },
      fadeLeft: { from: { opacity: 0, x: -60 }, to: { opacity: 1, x: 0 } },
      fadeRight: { from: { opacity: 0, x: 60 }, to: { opacity: 1, x: 0 } },
      scaleUp: { from: { opacity: 0, scale: 0.8 }, to: { opacity: 1, scale: 1 } },
      rotateIn: { from: { opacity: 0, rotation: -10 }, to: { opacity: 1, rotation: 0 } },
    }

    const { from, to } = animations[animation]
    const targets = stagger > 0 && element.children.length > 0 ? element.children : element

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, from, {
        ...to,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      })
    }, element)

    return () => ctx.revert()
  }, [animation, duration, delay, stagger, scrub])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface GsapSplitTextProps {
  text: string
  className?: string
  type?: 'chars' | 'words' | 'lines'
  animation?: 'fadeUp' | 'slideUp' | 'rotateIn' | 'scaleUp'
  duration?: number
  stagger?: number
  once?: boolean
}

export function GsapSplitText({
  text,
  className = '',
  type = 'chars',
  animation = 'fadeUp',
  duration = 0.8,
  stagger = 0.03,
  once = false,
}: GsapSplitTextProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let items: string[]
    if (type === 'chars') {
      items = text.split('')
    } else if (type === 'words') {
      items = text.split(' ')
    } else {
      items = text.split('\n')
    }

    element.innerHTML = items
      .map((item, i) => {
        const content = item === ' ' ? '&nbsp;' : item
        return `<span class="gsap-split-item" style="display:inline-block;overflow:hidden;"><span class="gsap-split-inner" style="display:inline-block;">${content}</span></span>${type === 'words' && i < items.length - 1 ? ' ' : ''}`
      })
      .join('')

    const innerSpans = element.querySelectorAll('.gsap-split-inner')

    const animations = {
      fadeUp: { y: '100%', opacity: 0 },
      slideUp: { y: '120%', opacity: 0.5 },
      rotateIn: { y: '100%', rotationX: -90, opacity: 0 },
      scaleUp: { y: '100%', scale: 0.5, opacity: 0 },
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerSpans,
        animations[animation],
        {
          y: '0%',
          opacity: 1,
          rotationX: 0,
          scale: 1,
          duration,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: once ? 'play none none none' : 'play reverse play reverse',
          },
        }
      )
    }, element)

    return () => ctx.revert()
  }, [text, type, animation, duration, stagger])

  return <div ref={ref} className={className} />
}

interface GsapParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down'
}

export function GsapParallax({
  children,
  className = '',
  speed = 0.3,
  direction = 'up',
}: GsapParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const yValue = direction === 'up' ? -speed * 100 : speed * 100

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: yValue,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, element)

    return () => ctx.revert()
  }, [speed, direction])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface GsapDraggableProps {
  children: ReactNode
  className?: string
  type?: 'x' | 'y' | 'x,y' | 'rotation'
  bounds?: string | HTMLElement
  inertia?: boolean
  onDrag?: () => void
  onDragEnd?: () => void
}

export function GsapDraggable({
  children,
  className = '',
  type = 'x,y',
  bounds,
  inertia = true,
  onDrag,
  onDragEnd,
}: GsapDraggableProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const draggable = Draggable.create(element, {
      type,
      bounds,
      inertia,
      onDrag,
      onDragEnd,
      cursor: 'grab',
      activeCursor: 'grabbing',
    })

    return () => {
      draggable[0]?.kill()
    }
  }, [type, bounds, inertia, onDrag, onDragEnd])

  return (
    <div ref={ref} className={className} style={{ cursor: 'grab' }}>
      {children}
    </div>
  )
}

interface GsapPinSectionProps {
  children: ReactNode
  className?: string
  pinSpacing?: boolean
  duration?: string
}

export function GsapPinSection({
  children,
  className = '',
  pinSpacing = true,
  duration = '100%',
}: GsapPinSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top top',
        end: `+=${duration}`,
        pin: true,
        pinSpacing,
      })
    }, element)

    return () => ctx.revert()
  }, [pinSpacing, duration])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface GsapScrollProgressProps {
  className?: string
  color?: string
  height?: number
  position?: 'top' | 'bottom'
}

export function GsapScrollProgress({
  className = '',
  color = 'rgb(59, 130, 246)',
  height = 4,
  position = 'top',
}: GsapScrollProgressProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.to(element, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })
    }, element)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className={`fixed left-0 right-0 z-50 origin-left ${className}`}
      style={{
        [position]: 0,
        height,
        backgroundColor: color,
        transform: 'scaleX(0)',
      }}
    />
  )
}

interface GsapHorizontalScrollProps {
  children: ReactNode
  className?: string
  wrapperClassName?: string
}

export function GsapHorizontalScroll({
  children,
  className = '',
  wrapperClassName = '',
}: GsapHorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const wrapper = wrapperRef.current
    if (!container || !wrapper) return

    const ctx = gsap.context(() => {
      const totalWidth = wrapper.scrollWidth - container.clientWidth

      gsap.to(wrapper, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={wrapperRef} className={`flex ${wrapperClassName}`}>
        {children}
      </div>
    </div>
  )
}

interface GsapCounterProps {
  end: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  once?: boolean
}

export function GsapCounter({
  end,
  duration = 2,
  className = '',
  prefix = '',
  suffix = '',
  once = false,
}: GsapCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const countRef = useRef({ value: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.to(countRef.current, {
        value: end,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
        onUpdate: () => {
          element.textContent = `${prefix}${Math.round(countRef.current.value)}${suffix}`
        },
      })
    }, element)

    return () => ctx.revert()
  }, [end, duration, prefix, suffix])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}

interface GsapMagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function GsapMagnetic({
  children,
  className = '',
  strength = 0.3,
}: GsapMagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
