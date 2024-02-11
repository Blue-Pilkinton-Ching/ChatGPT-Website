import { useEffect } from 'react'
import { useGlobalState } from '../../../hooks/useGlobalState'
import { Message } from './Message'
import { Assistant, GeminiMessage } from '../../../../interfaces'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'

export function Conversation() {
  const { globalState } = useGlobalState()

  useEffect(() => {
    const elements = [...document.getElementsByTagName('pre')]

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      // Replace the element with the JSX element

      if (element.classList.contains('user-message')) {
        continue
      }

      if (element.parentElement?.className !== 'code-block-container') {
        const wrapper = document.createElement('div')
        wrapper.className = 'code-block-container'

        const headerDiv = document.createElement('div')
        headerDiv.className = 'code-block-header'

        const header = document.createElement('h6')
        header.innerText = element.children[0].classList[1]

        if (header.innerText == 'undefined') {
          header.innerText = 'unknown'
          element.children[0].className = 'hljs'
        }

        const copy = document.createElement('img')
        copy.src = '/images/copy.svg'
        copy.alt = 'copy code'
        copy.className = 'copy-code-svg'

        const button = document.createElement('button') as HTMLButtonElement
        button.className = 'copy-code button'
        if (button != null) {
          button.addEventListener('click', () => {
            navigator.clipboard.writeText(
              element.children[0]?.textContent as string
            )
            copy.src = '/images/check.svg'
            setTimeout(() => {
              copy.src = '/images/copy.svg'
            }, 2000)
          })
        }

        element.parentNode?.insertBefore(wrapper, element)

        wrapper.appendChild(element)
        wrapper.insertBefore(headerDiv, element)
        headerDiv.appendChild(button)
        headerDiv.appendChild(header)
        button.appendChild(copy)

        if (!window.isSecureContext) {
          button.remove()
        }
      }
    }
  })

  return (
    <div
      className="conversation"
      style={{
        maxHeight: `calc(100vh - 20px - 30px - 2px - 60px - ${globalState.messageTextAreaHeight})`,
      }}
    >
      {globalState.currentThread ? (
        <>
          <br />
          {globalState.currentThread.conversation.map((element, index) => {
            return globalState.currentThread?.assistant.id === 'gemini-pro' ? (
              <Message
                key={index}
                assistant={globalState.currentThread?.assistant as Assistant}
                message={
                  globalState.currentThread?.conversation[
                    -index +
                      (globalState.currentThread?.conversation.length - 1)
                  ] as GeminiMessage
                }
              />
            ) : (
              <Message
                key={index}
                assistant={globalState.currentThread?.assistant as Assistant}
                message={
                  globalState.currentThread?.conversation[
                    -index +
                      (globalState.currentThread?.conversation.length - 1)
                  ] as ChatCompletionMessageParam
                }
              />
            )
          })}
        </>
      ) : (
        ''
      )}
    </div>
  )
}
