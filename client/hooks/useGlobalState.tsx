import { createContext, useContext } from 'react'
import { GlobalStateWrapper } from '../../interfaces'

export function useGlobalState() {
  const context = useContext(GlobalStateContext)

  if (context == undefined) {
    throw 'Global Context is null or undefined'
  }

  return context
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const GlobalStateContext = createContext<GlobalStateWrapper>()
