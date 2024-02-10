import { KeyboardEvent, useEffect, useRef } from 'react'
import { onSave as onSaveEvent } from '../Settings'
import { SettingsContentProps } from '../../../../../interfaces'
import { useGlobalRef } from '../../../../hooks/useGlobalRef'
import { useNewAPIKey } from '../../../../hooks/useNewAPIKey'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'

export function APIKeySettings(props: SettingsContentProps) {
  const openAIApiKeyRef = useRef<HTMLInputElement>(null)
  const geminiProApiKeyRef = useRef<HTMLInputElement>(null)
  const globalRef = useGlobalRef()
  const [user] = useAuthState(getAuth())
  const changeAPIKey = useNewAPIKey()

  useEffect(() => {
    onSaveEvent.on('action', onSave)

    const openAIAPIKey = openAIApiKeyRef.current as HTMLInputElement
    openAIAPIKey.value = globalRef.settings
      ? globalRef.settings.openAIAPIKey
      : ''

    const geminiProApiKey = geminiProApiKeyRef.current as HTMLInputElement
    geminiProApiKey.value = globalRef.settings
      ? globalRef.settings.geminiProAPIKey
      : ''

    return () => {
      onSaveEvent.off('action', onSave)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onSave() {
    const openAIAPIKey = openAIApiKeyRef.current as HTMLInputElement

    if (globalRef.settings.openAIAPIKey != openAIAPIKey.value) {
      await changeAPIKey(openAIAPIKey.value, 'open-ai')
    }

    const geminiProApiKey = geminiProApiKeyRef.current as HTMLInputElement

    if (globalRef.settings.geminiProAPIKey != geminiProApiKey.value) {
      await changeAPIKey(geminiProApiKey.value, 'gemini-pro')
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.code === 'Enter') {
      event.preventDefault()
      event.currentTarget.blur()
    }
  }

  return (
    <>
      <div className={`${props.show ? '' : 'hide'} setting`}>
        <p className="settings-label">Open AI</p>
        <input
          disabled={user?.email === 'demo@prepaygpt.xyz'}
          type="password"
          name="apiKey"
          ref={openAIApiKeyRef}
          onKeyDown={onKeyDown}
          className={`api-key-text text`}
          placeholder="Enter your OpenAI API key..."
        />
      </div>
      <div className={`${props.show ? '' : 'hide'} setting`}>
        <p className="settings-label">Gemini Pro</p>
        <input
          disabled={user?.email === 'demo@prepaygpt.xyz'}
          type="password"
          name="apiKey"
          ref={geminiProApiKeyRef}
          onKeyDown={onKeyDown}
          className={`api-key-text text`}
          placeholder="Enter your Google Gemini API key..."
        />
      </div>
    </>
  )
}
