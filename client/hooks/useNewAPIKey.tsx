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

    if (
      !globalRef.settings.assistants ||
      globalRef.settings.assistants.length === 0
    ) {
      globalRef.settings.assistants = [
        {
          id: 'gpt3',
          name: 'GPT-3.5 Turbo',
          instructions: null,
          model: 'gpt-3.5-turbo',
          isDefault: true,
          maxTokens: 1500,
        },
        {
          id: 'gpt4',
          name: 'GPT-4 Turbo',
          instructions: null,
          model: 'gpt-4-turbo-preview',
          isDefault: false,
          maxTokens: 1500,
        },
        {
          id: 'header',
          name: 'Header Generator',
          instructions:
            'Create a concise, neutral topic header summarizing the following text sent by the user. It must be under five words, and without periods, quotes, or embellishments, and avoid providing specific detail or answers.',
          model: 'gpt-3.5-turbo-1106',
          isDefault: false,
          temperature: 0,
          maxTokens: 15,
        },
      ]
    }
  }
  return triggerNewAPIKey
}
