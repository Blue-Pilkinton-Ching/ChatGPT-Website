import { useGlobalState } from '../../../hooks/useGlobalState'
import markdownit from 'markdown-it'

const md = markdownit({ breaks: true, linkify: true, typographer: false })

export function Conversation() {
  const { globalState } = useGlobalState()

  return (
    <div
      className="conversation"
      style={{
        maxHeight: `calc(100vh - 20px - 30px - 2px - 60px - ${globalState.messageTextAreaHeight})`,
      }}
    >
      {globalState.currentThread
        ? globalState.currentThread.messages.map((message, index) => {
            return (
              <div className="message-box" key={index}>
                <div className="message" />
                <div
                  className="message-content"
                  dangerouslySetInnerHTML={{
                    __html: md.render(message.content),
                  }}
                ></div>
              </div>
            )
          })
        : ''}
    </div>
  )
}
