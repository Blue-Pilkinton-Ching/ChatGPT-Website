import { useEffect } from 'react'
import { useGlobalState } from '../../../hooks/useGlobalState'
import { Message } from './Message'

export function Conversation() {
  const { globalState } = useGlobalState()

  useEffect(() => {
    const elements = [...document.getElementsByTagName('pre')]

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      // Replace the element with the JSX element

      if (element.parentElement?.className !== 'code-block-container') {
        const wrapper = document.createElement('div')
        wrapper.className = 'code-block-container'

        const headerDiv = document.createElement('div')
        headerDiv.className = 'code-block-header'

        const header = document.createElement('h6')
        header.innerText = element.children[0].classList[1].slice(9)

        const copy = document.createElement('img')
        copy.src = 'images/copy.svg'
        copy.alt = 'copy code'
        copy.className = 'copy-code-svg'

        const button = document.createElement('button') as HTMLButtonElement
        button.className = 'copy-code button'
        if (button != null) {
          button.addEventListener('click', () => {
            navigator.clipboard.writeText(
              element.children[0]?.textContent as string
            )
            copy.src = 'images/check.svg'
            setTimeout(() => {
              copy.src = 'images/copy.svg'
            }, 2000)
          })
        }

        element.parentNode?.insertBefore(wrapper, element)

        wrapper.appendChild(element)
        wrapper.insertBefore(headerDiv, element)
        headerDiv.appendChild(button)
        headerDiv.appendChild(header)
        button.appendChild(copy)
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
          {globalState.currentThread.messages.map((message, index) => {
            return <Message key={index} message={message} />
          })}
        </>
      ) : (
        ''
      )}
    </div>
  )
}
