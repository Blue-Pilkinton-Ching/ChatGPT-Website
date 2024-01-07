import { Thread, ThreadOptionProps } from '../../../../interfaces'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import * as db from 'firebase/firestore'
import { useGlobalState } from '../../../hooks/useGlobalState'
import { useWindowSize } from '@uidotdev/usehooks'

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
      </div>
    </>
  )
}
