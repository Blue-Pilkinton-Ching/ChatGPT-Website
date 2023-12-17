import markdownit from 'markdown-it'
import { MessageProps } from '../../../../interfaces'

const md = markdownit({ breaks: true, linkify: true, typographer: false })

export function Message(props: MessageProps) {
  return (
    <div className="message-box">
      <div className="message" />
      <div
        className="message-content"
        dangerouslySetInnerHTML={{
          __html: md.render(props.message.content),
        }}
      ></div>
    </div>
  )
}
