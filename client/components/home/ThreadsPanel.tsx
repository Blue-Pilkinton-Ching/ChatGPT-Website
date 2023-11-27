import { FormEvent } from 'react'
import { ThreadPanelProps } from '../../../interfaces.ts'
import { useGlobalData } from '../../hooks/useGlobalData.tsx'

export default function ThreadPanel(props: ThreadPanelProps) {
  const { globalData } = useGlobalData()

  function handleExit(event: FormEvent<HTMLButtonElement>) {
    event?.preventDefault()
    props.onExitButton()
  }

  function OnAccountClick(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    globalData?.auth
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
      <div className={`threads-panel ${props.show ? 'show' : 'hide'}`}>
        <button onClick={handleExit} className="exit-threads-panel">
          <div className="bar1 bar"></div>
          <div className="bar2 bar"></div>
        </button>
        <button className="account-container" onClick={OnAccountClick}>
          <img
            className="profile-photo"
            src={globalData?.auth.currentUser?.photoURL as string}
            alt=""
            referrerPolicy="no-referrer"
          />
          <span className="account-name">
            {globalData?.auth.currentUser
              ? globalData.auth.currentUser.displayName
              : 'name'}
          </span>
        </button>
      </div>
    </>
  )
}
