import { FormEvent } from 'react'
import { ThreadPanelProps } from '../../../../interfaces.ts'
import { getAuth } from 'firebase/auth'

export default function ThreadPanel(props: ThreadPanelProps) {
  function handleExit(event: FormEvent<HTMLButtonElement>) {
    event?.preventDefault()
    props.onExitButton()
  }

  function OnAccountClick(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    getAuth()
      .signOut()
      .catch((error) => {
        console.error('Failed to sign out')
        console.error(error.message)
        alert(error.message)
      })
  }

  return (
    <>
      <div className={`threads-panel ${props.show ? 'show' : 'hide'}`}>
        <button onClick={handleExit} className="exit-threads-panel">
          <div className="bar1 bar"></div>
          <div className="bar2 bar"></div>
        </button>
        <button className="account-container" onClick={OnAccountClick}>
          <img
            className="profile-photo"
            src={getAuth().currentUser?.photoURL as string}
            alt=""
            referrerPolicy="no-referrer"
          />
          <span className="account-name">
            {getAuth().currentUser
              ? getAuth().currentUser?.displayName
              : 'name'}
          </span>
        </button>
      </div>
    </>
  )
}
