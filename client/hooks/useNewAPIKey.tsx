import OpenAI from 'openai'
import { useGlobalRef } from './useGlobalRef'

export function useNewAPIKey() {
  const globalRef = useGlobalRef()

  async function GenerateAssistants() {
    const gpt3 = await globalRef.openai?.beta.assistants.create({
      name: 'PrePayGPT - GPT-3.5 Turbo Assistant',
      model: 'gpt-3.5-turbo-1106',
    })

    const gpt4 = await globalRef.openai?.beta.assistants.create({
      name: 'PrePayGPT - GPT-4 Turbo Assistant',
      model: 'gpt-4-1106-preview',
    })

    if (!gpt3 || !gpt4) {
      throw new Error('Failed to generate assistants')
    }

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
      globalRef.settings.assistants.length === 0
    ) {
      await GenerateAssistants()
        .then(({ gpt3, gpt4 }) => {
          globalRef.settings.assistants = [
            {
              id: gpt3.id,
              name: 'GPT-3.5 Turbo',
              instructions: gpt3.instructions,
              model: gpt3.model,
              isDefault: true,
            },
            {
              id: gpt4.id,
              name: 'GPT-4 Turbo',
              instructions: gpt4.instructions,
              model: gpt4.model,
              isDefault: false,
            },
          ]
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
