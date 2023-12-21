import { FormEvent } from 'react'
import { ThreadPanelProps } from '../../../../interfaces.ts'
import { getAuth } from 'firebase/auth'
import { ExitButton } from '../../ExitButton.tsx'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSignOut } from 'react-firebase-hooks/auth'
import { useGlobalState } from '../../../hooks/useGlobalState.tsx'
import ThreadOption from './ThreadOption.tsx'
import { useGlobalRef } from '../../../hooks/useGlobalRef.tsx'
import authLogos from '../../../auth-logos.ts'

export default function ThreadPanel(props: ThreadPanelProps) {
  const [user, authLoading, authError] = useAuthState(getAuth())
  const [signOut] = useSignOut(getAuth())
  const { globalState, setGlobalState } = useGlobalState()
  const globalRef = useGlobalRef()

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

  function ShowMoreThreads() {
    globalRef.getMoreThreads()
  }

  return (
    <>
      <div className={`threads-panel ${props.show ? 'show' : 'hide'}`}>
        <ExitButton onClick={handleExit} classes="exit-threads" />
        <div className="threads-head">
          <div className="new-chat-option text">
            <button
              onClick={CreateNewChat}
              className={`new-chat-button button ${
                globalState.insideNewChat ? 'selected' : ''
              }`}
            >
              <img src="images/logo.svg" className="new-chat-logo" alt="" />
              <h3>New Chat</h3>
            </button>
          </div>
        </div>
        <div className="thread-option-list">
          {globalState.threadHeaders.map((thread, index) => {
            return <ThreadOption thread={thread} key={index} />
          })}
          {globalState.reachedFinalThreadHeader ? (
            ''
          ) : (
            <div className="load-more-threads">
              <button
                className="load-more-threads-button button"
                onClick={ShowMoreThreads}
              >
                <img
                  src="images/down-arrow.svg"
                  className="down-arrow"
                  alt=""
                />
              </button>
            </div>
          )}
        </div>
        <button className="account-container" onClick={OnAccountClick}>
          <img
            className="profile-photo"
            src={user.photoURL ? user.photoURL : authLogos.guest}
            alt=""
            referrerPolicy="no-referrer"
          />
          <span className="account-name text">
            {user.displayName ? user.displayName : 'Anonymous User'}
          </span>
        </button>
      </div>
    </>
  )
}
