import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { onApplySettings } from '../ApplySettings'
import { useGlobalData } from '../../../../hooks/useGlobalData'

export function APIKeySettings() {
  const [apiKey, setApiKey] = useState('')
  let globalData = useGlobalData()

  useEffect(() => {
    onApplySettings.on('save', onSave)
    onApplySettings.on('cancel', onCancel)

    return () => {
      onApplySettings.off('save', onSave)
      onApplySettings.off('cancel', onCancel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSave() {
    console.log(apiKey)
    console.log('saving')
    globalData = { ...globalData, settings: { apiKey: apiKey } }
  }
  function onCancel() {
    setApiKey('')
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.code === 'Enter') {
      event.preventDefault()
      event.currentTarget.blur()
    }
  }

  function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.preventDefault()
    setApiKey(event.target.value)
    console.log(apiKey)
  }

  return (
    <>
      <textarea
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="api-key-text text"
        placeholder="Paste your OpenAI API key..."
        wrap="off"
      />
    </>
  )
}
