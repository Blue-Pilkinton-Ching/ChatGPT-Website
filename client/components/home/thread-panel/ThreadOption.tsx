import { Thread, ThreadOptionProps } from '../../../../interfaces'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import * as db from 'firebase/firestore'
import { useGlobalState } from '../../../hooks/useGlobalState'
import { useWindowSize } from '@uidotdev/usehooks'
import { MouseEvent } from 'react'

export default function ThreadOption(props: ThreadOptionProps) {
  const [user] = useAuthState(getAuth())
  const { width } = useWindowSize()
  const { globalState, setGlobalState } = useGlobalState()

  async function onClick() {
    const threadDoc = db.doc(
      db.getFirestore(),
      `threads/${user?.uid}/conversations/${props.thread.threadID}`
    )

    const thread = (await db.getDoc(threadDoc)).data() as Thread
    setGlobalState((oldState) => ({
      ...oldState,
      currentThread: thread,
      insideNewChat: false,
      showThreadsPanel: width ? width >= 400 : false,
    }))
  }

  function onHover(event: MouseEvent<HTMLElement>) {
    const parent = event.currentTarget.parentElement as HTMLElement
    parent.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
  }

  function onHoverOut(event: MouseEvent<HTMLElement>) {
    const parent = event.currentTarget.parentElement as HTMLElement
    parent.style.backgroundColor = ''
  }

  function onDelete() {
    const threadDoc = db.doc(
      db.getFirestore(),
      `threads/${user?.uid}/conversations/${props.thread.threadID}`
    )

    const headerDoc = db.doc(
      db.getFirestore(),
      `threads/${user?.uid}/headers/${props.thread.threadID}`
    )
    db.deleteDoc(threadDoc)
    db.deleteDoc(headerDoc)

    setGlobalState((oldState) => {
      const index = oldState.threadHeaders.findIndex(
        (x) => x.threadID === props.thread.threadID
      )

      const newHeaders = oldState.threadHeaders

      newHeaders.splice(index, 1)

      return {
        ...oldState,
        threadHeaders: newHeaders,
      }
    })
  }

  return (
    <>
      <div className={`thread-option`}>
        <button
          onClick={onClick}
          className={`thread-button text ${
            globalState.currentThread?.id === props.thread.threadID &&
            !globalState.insideNewChat
              ? 'selected'
              : ''
          }`}
        >
          {props.thread.name}
        </button>
        <button
          // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
          onMouseOver={onHover}
          // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
          onMouseOut={onHoverOut}
          className="thread-option-settings button"
          onClick={onDelete}
        >
          <img
            data-element="delete"
            className="delete-conversation"
            src="images/delete.svg"
            alt="delete conversation icon"
          />
        </button>
      </div>
    </>
  )
}
