import OpenAI from 'openai'
import { useGlobalRef } from './useGlobalRef'
import { GoogleGenerativeAI } from '@google/generative-ai'

export function useNewAPIKey() {
  const globalRef = useGlobalRef()

  async function triggerNewAPIKey(
    newAPIKey: string,
    type: 'open-ai' | 'gemini-pro'
  ) {
    switch (type) {
      case 'gemini-pro': {
        {
          globalRef.settings = {
            ...globalRef.settings,
            geminiProAPIKey: newAPIKey,
          }
        }

        const googleai = new GoogleGenerativeAI(newAPIKey)
        globalRef.googleai = googleai

        break
      }
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
