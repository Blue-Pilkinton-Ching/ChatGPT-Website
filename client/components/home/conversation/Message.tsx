import { GeminiMessage, MessageProps } from '../../../../interfaces'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark-dimmed.css'
import authLogos from '../../../auth-logos'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'

const botMarked = new Marked(
  markedHighlight({
    langPrefix: 'hljs ',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  })
)

botMarked.setOptions({
  breaks: true,
})

export function Message(props: MessageProps) {
  const [user] = useAuthState(getAuth())

  const isUser = props.message.role === 'user'
  const isSystem = props.message.role === 'system'

  const isGemini = props.assistant.id === 'gemini-pro'

  let messageContent

  let message = props.message

  if (isGemini) {
    message = message as GeminiMessage
    messageContent = message.parts as string
  } else {
    message = message as ChatCompletionMessageParam
    messageContent = message.content as string
  }

  let userMessage
  if (isUser) {
    userMessage = messageContent.split(/\n/g)
  }

  return (
    <div className="message-box">
      <img
        src={
          isUser
            ? user?.photoURL
              ? user?.photoURL
              : authLogos.guest
            : '/images/logo-bg.svg'
        }
        alt="Profile"
        className="message-photo"
      />
      <h4>{isUser ? 'You' : isSystem ? 'System' : props.assistant.name}</h4>
      <br />
      <div className="message">
        {isUser ? (
          <>
            <p></p>
            <pre className="message-content text user-message">
              {userMessage?.map((element, index) => {
                return (
                  <div key={index}>
                    {element} <br />
                  </div>
                )
              })}
            </pre>
          </>
        ) : (
          <div
            className="message-content text"
            dangerouslySetInnerHTML={{
              __html: `<p></p>${botMarked.parse(messageContent)}`,
            }}
          ></div>
        )}
      </div>
    </div>
  )
}
