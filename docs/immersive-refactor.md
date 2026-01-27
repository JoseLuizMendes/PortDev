# Immersive Web Experience Refactoring

This document describes the immersive web experience refactoring implemented in this project, migrating from Framer Motion to GSAP + Lenis for enhanced performance and advanced scroll interactions.

## Overview

The refactoring introduces a cinematographic, immersive web experience with:
- **GSAP animations** for high-performance, 120fps animations
- **Lenis smooth scrolling** for buttery-smooth scroll interactions
- **SSR-safe implementation** compatible with Next.js 15 and React 19
- **Accessibility-first approach** respecting `prefers-reduced-motion` and touch device limitations
- **Strong TypeScript typing** with no `any` types

## Architecture

### Core Infrastructure

#### 1. GSAP Configuration (`src/lib/gsap-config.ts`)

Central configuration module that:
- Registers GSAP plugins safely for client-side use only
- Prevents SSR hydration errors
- Provides utility functions for creating timelines and checking device capabilities
- Exports typed GSAP instances and helpers

**Key Functions:**
- `registerGSAPPlugins()`: Registers ScrollTrigger, Observer, Flip, and TextPlugin
- `getGSAP()`: Returns GSAP instance (auto-initializes if needed)
- `getScrollTrigger()`: Returns ScrollTrigger instance
- `createTimeline(config?)`: Creates a GSAP timeline with sensible defaults
- `shouldEnableAdvancedAnimations()`: Feature detection for high-performance mode
- `killAllGSAP()`: Cleanup utility for unmounting

For detailed usage examples and additional information, see the file directly.

## Integration Guide

### Layout Integration

The immersive experience is integrated at the root layout level:

```tsx
<SmoothScrollWrapper>
  <PageTransitionProvider>
    {children}
  </PageTransitionProvider>
</SmoothScrollWrapper>
```

### Component Usage

All new components are documented inline with JSDoc comments. Key components:
- `PreloaderSplashScreen`: Cinematographic intro animation
- `HeroExperience`: Immersive hero section with GSAP animations
- `DecryptedTextGSAP`: Text scramble/reveal effect
- `PageTransitionProvider`: Route transition animations

## Performance

Target: **120fps** on desktop browsers

Optimizations:
- Hardware-accelerated CSS transforms
- Reduced complexity on mobile devices
- Automatic feature detection and fallbacks
- Efficient ScrollTrigger configuration

## Accessibility

All animations:
- Respect `prefers-reduced-motion` preference
- Include proper ARIA labels
- Maintain keyboard navigation
- Provide screen reader alternatives

## Resources

- GSAP Documentation: https://gsap.com/docs/v3/
- Lenis GitHub: https://github.com/studio-freight/lenis
