import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useGlobalRef } from '../../../hooks/useGlobalRef'
import { ChangeEvent, useEffect, useState } from 'react'
import { Assistant } from '../../../../interfaces'

export default function NewChatPage() {
  const [user] = useAuthState(getAuth())
  const globalRef = useGlobalRef()
  const [model, setModel] = useState('')

  useEffect(() => {
    if (user?.email === 'demo@prepaygpt.xyz') {
      globalRef.assistants = globalRef.assistants.filter((a) => a.canDemo)
      setModel('GPT-3.5 Turbo')
    } else {
      setModel(
        globalRef.assistants[globalRef.assistants.findIndex((a) => a.isDefault)]
          .name
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    setModel(event.currentTarget.value)
  }

  useEffect(() => {
    globalRef.assistant = globalRef.assistants.find(
      (a) => a.name === model
    ) as Assistant

    if (!globalRef.assistant) {
      alert('error finding model!')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model])

  return (
    <>
      <div className="new-chat-page">
        <div className="logo-container">
          <img src="/images/logo.svg" alt="logo" className="logo-svg" />
        </div>
        <h1>How can I help you today?</h1>
        <select
          onChange={onChange}
          value={model}
          name="model"
          className="select-model text"
        >
          {globalRef.assistants.map((element, index) => {
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
