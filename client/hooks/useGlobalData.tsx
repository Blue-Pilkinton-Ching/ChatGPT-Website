import { createContext, useContext } from 'react'
import { GlobalDataWrapper } from '../../interfaces'

export function useGlobalData() {
  const context = useContext(GlobalContext)

  if (context == undefined) {
    throw 'Global Context is null or undefined'
  }

  return context
}

export const GlobalContext = createContext<GlobalDataWrapper | undefined>(
  undefined
)
