import { createContext, useContext } from 'react'
import { GlobalRef } from '../../interfaces'

export function useGlobalRef() {
  const context = useContext(GlobalRefContext)

  if (context == undefined) {
    throw 'Global Context is null or undefined'
  }

  return context
}
export const GlobalRefContext = createContext<
  React.MutableRefObject<GlobalRef | null>
>({ current: null })
