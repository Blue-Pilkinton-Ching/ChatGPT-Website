import { FormEvent } from 'react'
import { ThreadPanelProps } from '../../../../interfaces.ts'
import { getAuth } from 'firebase/auth'
import { ExitButton } from '../../ExitButton.tsx'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSignOut } from 'react-firebase-hooks/auth'

export default function ThreadPanel(props: ThreadPanelProps) {
  const [user, authLoading, authError] = useAuthState(getAuth())
  const [signOut] = useSignOut(getAuth())

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

  return (
    <>
      <div className={`threads-panel ${props.show ? 'show' : 'hide'}`}>
        <ExitButton onClick={handleExit} />
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
