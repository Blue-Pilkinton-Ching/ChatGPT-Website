import { useGlobalState } from '../../../hooks/useGlobalState'

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
                {message.content}
              </div>
            )
          })
        : ''}
    </div>
  )
}
