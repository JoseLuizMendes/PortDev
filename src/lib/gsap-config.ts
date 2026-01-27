let hasRegistered = false

export async function registerGSAPPlugins() {
  if (hasRegistered) return
  if (typeof window === 'undefined') return

  const { gsap } = await import('gsap')

  // TextPlugin é útil para animações de texto (typing/reveal) e integrações.
  // Mantemos o registro lazy para evitar qualquer risco de "window is not defined".
  const { TextPlugin } = await import('gsap/TextPlugin')

  gsap.registerPlugin(TextPlugin)
  hasRegistered = true
}

export async function getGSAP() {
  await registerGSAPPlugins()
  const { gsap } = await import('gsap')
  return gsap
}
