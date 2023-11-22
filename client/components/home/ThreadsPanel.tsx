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
  }

  console.log(globalData?.authInfo.user)

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
            src={globalData?.authInfo.user.photoURL as string}
            alt=""
            referrerPolicy="no-referrer"
          />
          <span className="account-name">
            {globalData ? globalData.authInfo.user.displayName : 'name'}
          </span>
        </button>
      </div>
    </>
  )
}
