import OpenAI from 'openai'
import { useGlobalRef } from './useGlobalRef'

export function useNewAPIKey() {
  const globalRef = useGlobalRef()

  async function triggerNewAPIKey(newAPIKey: string) {
    const openai = new OpenAI({
      apiKey: newAPIKey,
      dangerouslyAllowBrowser: true,
    })

    globalRef.settings = {
      ...globalRef.settings,
      apiKey: newAPIKey,
    }

    globalRef.openai = openai
  }
  return triggerNewAPIKey
}
