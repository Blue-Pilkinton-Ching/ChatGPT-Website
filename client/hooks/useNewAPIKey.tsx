import OpenAI from 'openai'
import { useGlobalRef } from './useGlobalRef'

export function useNewAPIKey() {
  const globalRef = useGlobalRef()

  async function triggerNewAPIKey(
    newAPIKey: string,
    type: 'open-ai' | 'gemini-pro'
  ) {
    switch (type) {
      case 'gemini-pro':
        {
          globalRef.settings = {
            ...globalRef.settings,
            geminiProAPIKey: newAPIKey,
          }
        }
        break
      case 'open-ai': {
        globalRef.settings = {
          ...globalRef.settings,
          openAIAPIKey: newAPIKey,
        }

        const openai = new OpenAI({
          apiKey: globalRef.settings.openAIAPIKey,
          dangerouslyAllowBrowser: true,
        })

        globalRef.openai = openai
        break
      }
    }
  }
  return triggerNewAPIKey
}
