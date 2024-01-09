import { KeyboardEvent, useEffect, useRef } from 'react'
import { onSave as onSaveEvent } from '../Settings'
import { SettingsContentProps } from '../../../../../interfaces'
import { useGlobalRef } from '../../../../hooks/useGlobalRef'
import { useNewAPIKey } from '../../../../hooks/useNewAPIKey'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'

export function APIKeySettings(props: SettingsContentProps) {
  const apiKeyRef = useRef<HTMLInputElement>(null)
  const globalRef = useGlobalRef()
  const [user] = useAuthState(getAuth())
  const changeAPIKey = useNewAPIKey()

  useEffect(() => {
    onSaveEvent.on('action', onSave)

    const apiKey = apiKeyRef.current as HTMLInputElement
    apiKey.value = globalRef.settings ? globalRef.settings.apiKey : ''

    return () => {
      onSaveEvent.off('action', onSave)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onSave() {
    const apiKey = apiKeyRef.current as HTMLInputElement

    if (globalRef.settings.apiKey != apiKey.value) {
      await changeAPIKey(apiKey.value)
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
        <p className="settings-label">API Key</p>
        <input
          disabled={user?.email === 'demo@prepaygpt.xyz'}
          type="password"
          name="apiKey"
          ref={apiKeyRef}
          onKeyDown={onKeyDown}
          className={`api-key-text text`}
          placeholder="Enter your OpenAI API key..."
        />
      </div>
    </>
  )
}
