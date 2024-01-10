import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useGlobalRef } from '../../../hooks/useGlobalRef'
import { ChangeEvent, useEffect, useState } from 'react'
import { useGlobalState } from '../../../hooks/useGlobalState'
import { Assistant } from '../../../../interfaces'

export default function NewChatPage() {
  const [user] = useAuthState(getAuth())
  const globalRef = useGlobalRef()
  const { globalState } = useGlobalState()
  const [model, setModel] = useState('')

  useEffect(() => {
    setModel(
      user?.email === 'demo@prepaygpt.xyz'
        ? 'GPT-3.5 Turbo'
        : globalRef.settings.assistants[0]
        ? (globalRef.settings.assistants.find((a) => a.isDefault) as Assistant)
            .name
        : ''
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalState.triggers.downloadedSettings])

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    setModel(event.currentTarget.value)
  }

  useEffect(() => {
    globalRef.assistant = globalRef.settings.assistants.find(
      (a) => a.name === model
    ) as Assistant
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model])

  return (
    <>
      <div className="new-chat-page">
        <div className="logo-container">
          <img src="images/logo.svg" alt="logo" className="logo-svg" />
        </div>
        <h1>How can I help you today?</h1>
        <select
          onChange={onChange}
          value={model}
          name="model"
          className="select-model text"
          disabled={user?.email === 'demo@prepaygpt.xyz'}
        >
          {globalRef.settings.assistants.map((element, index) => {
            return (
              <option
                className="select-model-option text"
                key={index}
                value={element.name}
              >
                {element.name}
              </option>
            )
          })}
        </select>
      </div>
    </>
  )
}
