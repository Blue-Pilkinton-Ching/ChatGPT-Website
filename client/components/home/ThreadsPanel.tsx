import { FormEvent } from 'react'
import { ThreadPanelProps } from '../../../interfaces.ts'
import { User, getAuth } from 'firebase/auth'

let user: User

export default function ThreadPanel(props: ThreadPanelProps) {
  const auth = getAuth()

  auth.onAuthStateChanged((u) => {
    if (u == null) {
      return
    }
    user = u
  })

  function handleExit(event: FormEvent<HTMLButtonElement>) {
    event?.preventDefault()
    props.onExitButton()
  }

  function OnAccountClick(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    auth
      .signOut()
      .then(() => {
        console.log('Signed out!')
      })
      .catch((error) => {
        console.error('Failed to sign out')
        console.error(error.message)
        alert(error.message)
      })
  }

  return (
    <>
      {user ? (
        <div className={`threads-panel ${props.show ? 'show' : 'hide'}`}>
          <button onClick={handleExit} className="exit-threads-panel">
            <div className="bar1 bar"></div>
            <div className="bar2 bar"></div>
          </button>
          <button className="account-container" onClick={OnAccountClick}>
            <img
              className="profile-photo"
              src={user.photoURL as string}
              alt=""
              referrerPolicy="no-referrer"
            />
            <span className="account-name">
              {user ? user.displayName : 'name'}
            </span>
          </button>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
