'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import { motion, HTMLMotionProps } from 'motion/react'

interface DecryptedScrambleTextProps extends HTMLMotionProps<'span'> {
  text: string
  speed?: number
  maxIterations?: number
  sequential?: boolean
  revealDirection?: 'start' | 'end' | 'center'
  characters?: string
  className?: string
  encryptedClassName?: string
  parentClassName?: string
  scrambleOnHover?: boolean
  scrambleSpeed?: number
  /**
   * Se definido, o efeito inicial roda só uma vez por carregamento da página
   * (útil para evitar o double-run do React StrictMode em dev).
   */
  playOncePerPageLoadKey?: string
}

export default function DecryptedScrambleText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  scrambleOnHover = true,
  scrambleSpeed = 30,
  playOncePerPageLoadKey,
  ...props
}: DecryptedScrambleTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [displayText, setDisplayText] = useState<string>(text)
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false)
  const [isDecrypted, setIsDecrypted] = useState<boolean>(false)
  const [isScrambling, setIsScrambling] = useState<boolean>(false)
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())
  const hasAnimated = useRef<boolean>(false)
  const scrambleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const getPlayedFlagKey = useCallback(() => {
    if (!playOncePerPageLoadKey) return null
    return `__DECRYPTED_SCRAMBLE_TEXT_PLAYED__${playOncePerPageLoadKey}`
  }, [playOncePerPageLoadKey])

  const hasAlreadyPlayedThisLoad = useCallback(() => {
    if (typeof window === 'undefined') return false
    const k = getPlayedFlagKey()
    if (!k) return false
    return Boolean((window as any)[k])
  }, [getPlayedFlagKey])

  const markPlayedThisLoad = useCallback(() => {
    if (typeof window === 'undefined') return
    const k = getPlayedFlagKey()
    if (!k) return
    ;(window as any)[k] = true
  }, [getPlayedFlagKey])

  const getScrambledChar = useCallback(() => {
    return characters[Math.floor(Math.random() * characters.length)]
  }, [characters])

  // Inicia com texto embaralhado
  useEffect(() => {
    if (hasAlreadyPlayedThisLoad()) {
      setDisplayText(text)
      setIsDecrypting(false)
      setIsDecrypted(true)
      setRevealedIndices(new Set(text.split('').map((_, i) => i)))
      return
    }

    const scrambled = text
      .split('')
      .map(char => char === ' ' ? ' ' : getScrambledChar())
      .join('')
    setDisplayText(scrambled)
  }, [text, getScrambledChar, hasAlreadyPlayedThisLoad])

  // Animação de decriptação inicial
  useEffect(() => {
    if (!isDecrypting) return

    let iteration = 0
    const currentRevealed = new Set<number>()

    const interval = setInterval(() => {
      if (sequential) {
        const letterIndex = Math.floor(iteration / maxIterations)

        if (letterIndex >= text.length) {
          clearInterval(interval)
          setDisplayText(text)
          setIsDecrypting(false)
          setIsDecrypted(true)
          return
        }

        const nextIndex = revealDirection === 'start' 
          ? letterIndex 
          : text.length - 1 - letterIndex

        if (!currentRevealed.has(nextIndex)) {
          currentRevealed.add(nextIndex)
          setRevealedIndices(new Set(currentRevealed))
        }

        const shuffled = text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (currentRevealed.has(i)) return text[i]
            return getScrambledChar()
          })
          .join('')

        setDisplayText(shuffled)
        iteration++
      } else {
        iteration++
        if (iteration >= maxIterations) {
          clearInterval(interval)
          setDisplayText(text)
          setIsDecrypting(false)
          setIsDecrypted(true)
        } else {
          const shuffled = text
            .split('')
            .map((char) => char === ' ' ? ' ' : getScrambledChar())
            .join('')
          setDisplayText(shuffled)
        }
      }
    }, speed)

    return () => clearInterval(interval)
  }, [isDecrypting, text, speed, maxIterations, sequential, revealDirection, getScrambledChar])

  // Trigger inicial
  useEffect(() => {
    if (hasAlreadyPlayedThisLoad()) return

    if (!hasAnimated.current) {
      hasAnimated.current = true
      markPlayedThisLoad()
      const timer = setTimeout(() => {
        setIsDecrypting(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [hasAlreadyPlayedThisLoad, markPlayedThisLoad])

  // Efeito scramble no hover (após decriptação)
  const handleMouseEnter = useCallback(() => {
    if (!isDecrypted || !scrambleOnHover) return
    setIsScrambling(true)

    let iteration = 0
    scrambleIntervalRef.current = setInterval(() => {
      iteration++
      
      // Scramble aleatório com algumas letras originais
      const scrambled = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          // Probabilidade crescente de mostrar letra original
          const showOriginal = Math.random() < 0.3 + (iteration * 0.02)
          return showOriginal ? char : getScrambledChar()
        })
        .join('')

      setDisplayText(scrambled)

      // Após algumas iterações, volta ao original
      if (iteration > 15) {
        if (scrambleIntervalRef.current) {
          clearInterval(scrambleIntervalRef.current)
        }
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, scrambleSpeed)
  }, [isDecrypted, scrambleOnHover, text, getScrambledChar, scrambleSpeed])

  const handleMouseLeave = useCallback(() => {
    if (scrambleIntervalRef.current) {
      clearInterval(scrambleIntervalRef.current)
    }
    if (isDecrypted) {
      setDisplayText(text)
    }
    setIsScrambling(false)
  }, [isDecrypted, text])

  // Cleanup
  useEffect(() => {
    return () => {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current)
      }
    }
  }, [])

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap cursor-pointer ${parentClassName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealed = revealedIndices.has(index) || isDecrypted
          const currentClassName = isRevealed && !isScrambling 
            ? className 
            : encryptedClassName || className
          return (
            <span 
              key={index} 
              className={`transition-colors duration-100 ${currentClassName}`}
            >
              {char}
            </span>
          )
        })}
      </span>
    </motion.span>
  )
}
