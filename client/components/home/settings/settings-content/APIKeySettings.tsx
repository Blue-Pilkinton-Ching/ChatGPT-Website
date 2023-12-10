import { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react'
import { onSave as onSaveEvent } from '../Settings'
import { useGlobalData } from '../../../../hooks/useGlobalData'
import { SettingsContentProps } from '../../../../../interfaces'

export function APIKeySettings(props: SettingsContentProps) {
  const apiKeyRef = useRef<HTMLTextAreaElement>(null)
  const apiKey = useRef('')
  const { globalData, setGlobalData } = useGlobalData()

  useEffect(() => {
    const apiKeyRefNew = apiKeyRef.current as HTMLTextAreaElement
    apiKeyRefNew.value = globalData.settings.apiKey

    onSaveEvent.on('action', onSave)

    return () => {
      onSaveEvent.off('action', onSave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSave() {
    setGlobalData({ ...globalData, settings: { apiKey: apiKey.current } })
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.code === 'Enter') {
      event.preventDefault()
      event.currentTarget.blur()
    }
  }

  function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    apiKey.current = event.target.value
  }

  return (
    <>
      {props.show ? (
        <textarea
          ref={apiKeyRef}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="api-key-text text"
          placeholder="Enter your OpenAI API key..."
          wrap="off"
        />
      ) : (
        ''
      )}
    </>
  )
}
