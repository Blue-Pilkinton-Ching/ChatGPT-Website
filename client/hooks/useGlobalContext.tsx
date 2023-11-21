import { createContext, useContext } from 'react'
import { GlobalContextState } from '../../interfaces'

export function useGlobalContext() {
  const context = useContext(GlobalContext)

  if (context == undefined) {
    throw 'Global Context is null or undefined'
  }

  return context
}

export const GlobalContext = createContext<GlobalContextState | undefined>(
  undefined
)
