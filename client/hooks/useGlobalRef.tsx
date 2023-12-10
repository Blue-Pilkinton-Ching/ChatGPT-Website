import { createContext, useContext } from 'react'

export function useGlobalRef() {
  const context = useContext(GlobalRefContext)

  if (context == undefined) {
    throw 'Global Context is null or undefined'
  }

  return context
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const GlobalRefContext = createContext<GlobalRef>()
