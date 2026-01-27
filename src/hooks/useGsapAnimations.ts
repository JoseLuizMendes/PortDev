'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type AnimationType = 
  | 'fadeIn' 
  | 'fadeUp' 
  | 'fadeDown' 
  | 'fadeLeft' 
  | 'fadeRight'
  | 'scaleUp'
  | 'scaleDown'
  | 'rotateIn'
  | 'slideUp'
  | 'slideDown'
  | 'splitReveal'

interface UseGsapScrollOptions {
  animation?: AnimationType
  duration?: number
  delay?: number
  ease?: string
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  stagger?: number
  once?: boolean
}

const animationPresets: Record<AnimationType, gsap.TweenVars> = {
  fadeIn: { opacity: 0 },
  fadeUp: { opacity: 0, y: 60 },
  fadeDown: { opacity: 0, y: -60 },
  fadeLeft: { opacity: 0, x: -60 },
  fadeRight: { opacity: 0, x: 60 },
  scaleUp: { opacity: 0, scale: 0.8 },
  scaleDown: { opacity: 0, scale: 1.2 },
  rotateIn: { opacity: 0, rotation: -15, transformOrigin: 'left center' },
  slideUp: { y: 100, opacity: 0 },
  slideDown: { y: -100, opacity: 0 },
  splitReveal: { opacity: 0, y: 30, rotationX: -20 },
}

export function useGsapScroll<T extends HTMLElement = HTMLDivElement>(
  options: UseGsapScrollOptions = {}
) {
  const ref = useRef<T>(null)
  
  const {
    animation = 'fadeUp',
    duration = 1,
    delay = 0,
    ease = 'power3.out',
    start = 'top 85%',
    end = 'bottom 15%',
    scrub = false,
    markers = false,
    stagger = 0,
    once = true,
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const fromVars = animationPresets[animation]
    const children = stagger > 0 ? element.children : null

    const ctx = gsap.context(() => {
      if (children && children.length > 0) {
        gsap.fromTo(
          children,
          fromVars,
          {
            ...Object.fromEntries(
              Object.keys(fromVars).map(key => [key, key === 'opacity' ? 1 : 0])
            ),
            duration,
            delay,
            ease,
            stagger,
            scrollTrigger: {
              trigger: element,
              start,
              end,
              scrub,
              markers,
              toggleActions: once ? 'play none none none' : 'play reverse play reverse',
            },
          }
        )
      } else {
        gsap.fromTo(
          element,
          fromVars,
          {
            ...Object.fromEntries(
              Object.keys(fromVars).map(key => [key, key === 'opacity' ? 1 : 0])
            ),
            duration,
            delay,
            ease,
            scrollTrigger: {
              trigger: element,
              start,
              end,
              scrub,
              markers,
              toggleActions: once ? 'play none none none' : 'play reverse play reverse',
            },
          }
        )
      }
    }, element)

    return () => ctx.revert()
  }, [animation, duration, delay, ease, start, end, scrub, markers, stagger, once])

  return ref
}

export function useGsapParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.5
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: () => speed * 100,
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
  }, [speed])

  return ref
}

export function useGsapTextReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const words = element.textContent?.split(' ') || []
    element.innerHTML = words
      .map(word => `<span class="gsap-word" style="display:inline-block;overflow:hidden;"><span style="display:inline-block;">${word}</span></span>`)
      .join(' ')

    const innerSpans = element.querySelectorAll('.gsap-word > span')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerSpans,
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, element)

    return () => ctx.revert()
  }, [])

  return ref
}

export function useGsapHorizontalScroll<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null)
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

  return { containerRef, wrapperRef }
}
