import { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react'
import { onSave as onSaveEvent } from '../Settings'
import { SettingsContentProps } from '../../../../../interfaces'

export function APIKeySettings(props: SettingsContentProps) {
  const apiKeyRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    onSaveEvent.on('action', onSave)

    return () => {
      onSaveEvent.off('action', onSave)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSave() {}

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
