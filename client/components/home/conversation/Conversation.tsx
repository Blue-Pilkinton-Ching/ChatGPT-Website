import { useGlobalState } from '../../../hooks/useGlobalState'
import { Message } from './Message'

export function Conversation() {
  const { globalState } = useGlobalState()

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
