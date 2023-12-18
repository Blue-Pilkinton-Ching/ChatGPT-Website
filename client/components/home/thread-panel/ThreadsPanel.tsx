import { FormEvent } from 'react'
import { ThreadPanelProps } from '../../../../interfaces.ts'
import { getAuth } from 'firebase/auth'
import { ExitButton } from '../../ExitButton.tsx'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSignOut } from 'react-firebase-hooks/auth'
import { useGlobalState } from '../../../hooks/useGlobalState.tsx'
import ThreadOption from './ThreadOption.tsx'

export default function ThreadPanel(props: ThreadPanelProps) {
  const [user, authLoading, authError] = useAuthState(getAuth())
  const [signOut] = useSignOut(getAuth())
  const { globalState, setGlobalState } = useGlobalState()

  if (!user || authLoading || authError) {
    alert('Not signed in')
    console.error('Not signed in')
    return
  }

  function handleExit() {
    props.onExitButton()
  }

  function OnAccountClick(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    signOut()
  }

  function CreateNewChat() {
    setGlobalState((oldState) => ({
      ...oldState,
      insideNewChat: true,
    }))
  }

  return (
    <>
      <div className={`threads-panel ${props.show ? 'show' : 'hide'}`}>
        <ExitButton onClick={handleExit} />
        <div className="new-chat-option text">
          <button onClick={CreateNewChat} className="new-chat-button button">
            <img src="images/logo.svg" className="new-chat-logo" alt="" />
            <h3>New Chat</h3>
          </button>
        </div>
        <div className="thread-option-list">
          {globalState.threadHeaders.map((thread, index) => {
            return <ThreadOption thread={thread} key={index} />
          })}
        </div>
        <button className="account-container" onClick={OnAccountClick}>
          <img
            className="profile-photo"
            src={user.photoURL as string}
            alt=""
            referrerPolicy="no-referrer"
          />
          <span className="account-name text">{user.displayName}</span>
        </button>
      </div>
    </>
  )
}
