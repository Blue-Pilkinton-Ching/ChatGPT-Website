import { useGlobalState } from '../../../hooks/useGlobalState'
import markdownit from 'markdown-it'

const md = markdownit({ breaks: true, linkify: true, typographer: false })

export function Conversation() {
  const { globalState } = useGlobalState()

  return (
    <div className="conversation">
      {globalState.currentThread
        ? globalState.currentThread.messages.map((message, index) => {
            return (
              <div
                className="message-box"
                key={index}
                style={{
                  alignSelf: `${
                    message.role === 'user' ? 'flex-end' : 'flex-start'
                  }`,
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: md.render(message.content),
                  }}
                />
              </div>
            )
          })
        : ''}
    </div>
  )
}
