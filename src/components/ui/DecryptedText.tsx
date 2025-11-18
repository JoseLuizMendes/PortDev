'use client'

import { useEffect, useState, useRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface DecryptedTextProps extends HTMLMotionProps<'span'> {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: 'view' | 'hover' | 'both' | 'mount';
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  ...props
}: DecryptedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState<string>(text);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const hasAnimated = useRef<boolean>(false);

  // Detecta montagem e inicia com texto embaralhado
  useEffect(() => {
    if (animateOn === 'mount') {
      // Inicia com texto completamente embaralhado
      const chars = useOriginalCharsOnly
        ? Array.from(new Set(text.split(''))).filter(char => char !== ' ')
        : characters.split('');
      
      const scrambled = text
        .split('')
        .map(char => char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)])
        .join('');
      
      setDisplayText(scrambled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Animação principal
  useEffect(() => {
    if (!isAnimating) {
      setDisplayText(text);
      setRevealedIndices(new Set());
      return;
    }

    let iteration = 0;
    const currentRevealed = new Set<number>();
    
    const interval = setInterval(() => {
      if (sequential) {
        // A cada maxIterations, revela uma nova letra
        const letterIndex = Math.floor(iteration / maxIterations);
        
        if (letterIndex >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
          setIsAnimating(false);
          return;
        }
        
        // Determina qual letra revelar
        let nextIndex;
        if (revealDirection === 'start') {
          nextIndex = letterIndex;
        } else {
          nextIndex = text.length - 1 - letterIndex;
        }
        
        // Adiciona a letra revelada
        if (!currentRevealed.has(nextIndex)) {
          currentRevealed.add(nextIndex);
          setRevealedIndices(new Set(currentRevealed));
        }
        
        // Embaralha as letras não reveladas
        const chars = useOriginalCharsOnly
          ? Array.from(new Set(text.split(''))).filter(char => char !== ' ')
          : characters.split('');
        
        const shuffled = text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (currentRevealed.has(i)) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        
        setDisplayText(shuffled);
        iteration++;
      } else {
        iteration++;
        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setIsAnimating(false);
        } else {
          setRevealedIndices(prev => {
            const chars = useOriginalCharsOnly
              ? Array.from(new Set(text.split(''))).filter(char => char !== ' ')
              : characters.split('');
            
            const shuffled = text
              .split('')
              .map((char, i) => {
                if (char === ' ') return ' ';
                if (prev.has(i)) return text[i];
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('');
            
            setDisplayText(shuffled);
            return prev;
          });
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isAnimating, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly]);

  // Trigger para mount
  useEffect(() => {
    if (animateOn === 'mount' && !hasAnimated.current) {
      hasAnimated.current = true;
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [animateOn]);

  // Trigger para view
  useEffect(() => {
    if (animateOn !== 'view' && animateOn !== 'both') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            setIsAnimating(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [animateOn]);

  // Trigger para hover
  const hoverProps = (animateOn === 'hover' || animateOn === 'both')
    ? {
        onMouseEnter: () => setIsAnimating(true),
        onMouseLeave: () => setIsAnimating(false)
      }
    : {};

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...hoverProps}
      {...props}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealed = revealedIndices.has(index) || !isAnimating;
          return (
            <span key={index} className={isRevealed ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
