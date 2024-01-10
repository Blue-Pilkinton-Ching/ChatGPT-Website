import { FormEvent } from 'react'
import { getAuth } from 'firebase/auth'
import { ExitButton } from '../../ExitButton.tsx'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSignOut } from 'react-firebase-hooks/auth'
import { useGlobalState } from '../../../hooks/useGlobalState.tsx'
import ThreadOption from './ThreadOption.tsx'
import { useGlobalRef } from '../../../hooks/useGlobalRef.tsx'
import authLogos from '../../../auth-logos.ts'
import { useWindowSize } from '@uidotdev/usehooks'

export default function ThreadPanel() {
  const [user, authLoading, authError] = useAuthState(getAuth())
  const [signOut] = useSignOut(getAuth())
  const { globalState, setGlobalState } = useGlobalState()
  const globalRef = useGlobalRef()
  const { width } = useWindowSize()

  if (!user || authLoading || authError) {
    alert('Not signed in')
    console.error('Not signed in')
    return
  }

  function Exit() {
    setGlobalState((oldState) => ({
      ...oldState,
      showThreadsPanel: false,
    }))
  }

  function onLogout(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    signOut()
  }

  function CreateNewChat() {
    setGlobalState((oldState) => ({
      ...oldState,
      insideNewChat: true,
      showThreadsPanel: width ? width >= 400 : false,
    }))
  }

  function ShowMoreThreads() {
    globalRef.getMoreThreads()
  }

  return (
    <>
      <div
        className={`threads-panel ${
          globalState.showThreadsPanel ? 'show' : 'hide'
        }`}
      >
        <ExitButton onClick={Exit} classes="exit-threads" />
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
        <div className="account-container">
          <img
            className="profile-photo"
            src={user.photoURL ? user.photoURL : authLogos.guest}
            alt=""
            referrerPolicy="no-referrer"
          />
          <div className="account-name text">
            {user.displayName ? user.displayName : 'Anonymous User'}
          </div>
          <button onClick={onLogout} className="logout-button button">
            <img
              className="logout-img"
              src="images/logout.svg"
              alt="logout icon"
            />
          </button>
        </div>
      </div>
    </>
  )
}
