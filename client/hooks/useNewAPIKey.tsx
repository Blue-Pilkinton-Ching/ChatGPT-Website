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
    const header = await globalRef.openai?.beta.assistants.create({
      name: 'PrePayGPT - Header Generator',
      instructions:
        'Create a concise, neutral topic header summarizing the following text sent by the user. It must be under six words, and without periods, quotes, or embellishments, and avoid providing specific detail or answers.',
      model: 'gpt-3.5-turbo-1106',
    })

    if (!gpt3 || !gpt4 || !header) {
      throw new Error('Failed to generate assistants')
    }

    return { gpt3, gpt4, header }
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
        .then(({ gpt3, gpt4, header }) => {
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
            {
              id: header.id,
              name: 'Header Generator',
              instructions: header.instructions,
              model: header.model,
              isDefault: true,
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
