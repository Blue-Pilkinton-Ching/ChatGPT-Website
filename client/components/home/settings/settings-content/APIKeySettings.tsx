import { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react'
import { onSave as onSaveEvent } from '../Settings'
import { SettingsContentProps } from '../../../../../interfaces'
import { useGlobalRef } from '../../../../hooks/useGlobalRef'
import { useFirestoreData } from '../../../../hooks/useFirestoreData'

export function APIKeySettings(props: SettingsContentProps) {
  const apiKeyRef = useRef<HTMLTextAreaElement>(null)
  const apiKey = useRef('')
  const globalRef = useGlobalRef()
  const fsData = useFirestoreData()

  useEffect(() => {
    const apiKeyRefNew = apiKeyRef.current as HTMLTextAreaElement
    if (fsData != undefined) {
      //   throw new Error('fsData == undefiened')
      apiKeyRefNew.value = fsData.apiKey
    }
    onSaveEvent.on('action', onSave)

    return () => {
      onSaveEvent.off('action', onSave)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSave() {
    globalRef.current = {
      ...globalRef.current,
      settings: { apiKey: apiKey.current },
    }
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
