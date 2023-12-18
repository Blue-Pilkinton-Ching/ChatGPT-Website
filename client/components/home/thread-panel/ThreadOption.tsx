import { Thread, ThreadOptionProps } from '../../../../interfaces'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import * as db from 'firebase/firestore'
import { useGlobalState } from '../../../hooks/useGlobalState'

export default function ThreadOption(props: ThreadOptionProps) {
  const [user] = useAuthState(getAuth())
  const { globalState, setGlobalState } = useGlobalState()

  async function onClick() {
    const threadDoc = db.doc(
      db.getFirestore(),
      `threads/${user?.uid}/conversations/${props.thread.threadID}`
    )

    const thread = (await db.getDoc(threadDoc)).data() as Thread
    setGlobalState({
      ...globalState,
      currentThread: thread,
      insideNewChat: false,
    })
  }

  return (
    <>
      <div className="thread-option">
        <button onClick={onClick} className="thread-button text">
          {props.thread.name}
        </button>
      </div>
    </>
  )
}
