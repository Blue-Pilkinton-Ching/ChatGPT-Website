import { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react'
import { onSave as onSaveEvent } from '../Settings'
import { SettingsContentProps } from '../../../../../interfaces'
import { useGlobalRef } from '../../../../hooks/useGlobalRef'

export function APIKeySettings(props: SettingsContentProps) {
  const apiKeyRef = useRef<HTMLTextAreaElement>(null)
  const globalRef = useGlobalRef()

  useEffect(() => {
    onSaveEvent.on('action', onSave)

    const apiKey = apiKeyRef.current as HTMLTextAreaElement
    apiKey.value = globalRef.settings.apiKey

    return () => {
      onSaveEvent.off('action', onSave)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSave() {
    const apiKey = apiKeyRef.current as HTMLTextAreaElement

    globalRef.settings = {
      ...globalRef.settings,
      apiKey: apiKey.value,
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.code === 'Enter') {
      event.preventDefault()
      event.currentTarget.blur()
    }
  }

  function onChange(event: ChangeEvent<HTMLTextAreaElement>) {}

  return (
    <>
      <textarea
        ref={apiKeyRef}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={`api-key-text text ${props.show ? '' : 'hide'}`}
        placeholder="Enter your OpenAI API key..."
        wrap="off"
      />
    </>
  )
}
