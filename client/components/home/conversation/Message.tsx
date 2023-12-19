import { MessageProps } from '../../../../interfaces'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark-dimmed.css'

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  })
)

marked.setOptions({
  breaks: true,
})

export function Message(props: MessageProps) {
  const [user] = useAuthState(getAuth())

  const isUser = props.message.role === 'user'

  return (
    <div className="message-box">
      <img
        src={isUser ? (user?.photoURL as string) : 'images/logo-bg.svg'}
        alt="Profile"
        className="message-photo"
      />
      <h4>{isUser ? 'You' : props.assistant.name}</h4>
      <br />
      <div className="message">
        {isUser ? (
          <div className="message-content text">
            <p>{props.message.content as string}</p>
          </div>
        ) : (
          <div
            className="message-content text"
            dangerouslySetInnerHTML={{
              __html: marked.parse(props.message.content as string),
            }}
          ></div>
        )}
      </div>
    </div>
  )
}
