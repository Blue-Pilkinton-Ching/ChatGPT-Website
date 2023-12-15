import OpenAI from 'openai'
import { useGlobalRef } from './useGlobalRef'

export function useNewAPIKey() {
  const globalRef = useGlobalRef()

  async function GenerateAssistants() {
    const gpt3 = await globalRef.openai?.beta.assistants.create({
      name: 'PrePayGPT - GPT-3.5 Turbo Assistant',
      instructions:
        'You are GPT-3.5 Turbo, a highly advanced assistance AI Chatbot developed by OpenAI.',
      model: 'gpt-3.5-turbo-1106',
    })

    const gpt4 = await globalRef.openai?.beta.assistants.create({
      name: 'PrePayGPT - GPT-4 Turbo Assistant',
      instructions:
        'You are GPT-4, a highly advanced assistance AI Chatbot developed by OpenAI.',
      model: 'gpt-4-1106-preview',
    })
    return { gpt3, gpt4 }
  }

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
      globalRef.settings.assistants.length < 0
    ) {
      await GenerateAssistants()
        .then(({ gpt3, gpt4 }) => {
          console.log(gpt3, gpt4)
        })
        .catch((err) => {
          alert(err.message)
          console.log(err)
        })
    }
  }
  return triggerNewAPIKey
}
