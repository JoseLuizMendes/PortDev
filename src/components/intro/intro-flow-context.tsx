/*'use client'

import { createContext, useContext, type ReactNode } from 'react'

export type IntroFlowActions = {
  onSphereComplete: () => void
}

const IntroFlowActionsContext = createContext<IntroFlowActions | null>(null)

export function IntroFlowActionsProvider({
  value,
  children,
}: {
  value: IntroFlowActions
  children: ReactNode
}) {
  return (
    <IntroFlowActionsContext.Provider value={value}>
      {children}
    </IntroFlowActionsContext.Provider>
  )
}

export function useIntroFlowActions() {
  return useContext(IntroFlowActionsContext)
}
*/