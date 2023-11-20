import { FormEvent } from 'react'
import { ThreadPanelProps } from '../../Interfaces/interfaces.ts'

export default function ThreadPanel(props: ThreadPanelProps) {
  function handleExit(event: FormEvent<HTMLButtonElement>) {
    event?.preventDefault()
    props.onExitButton()
  }

  return (
    <>
      <div className={`threads-panel ${props.show ? 'show' : 'hide'}`}>
        <button onClick={handleExit} className="exit-threads-panel"></button>
      </div>
    </>
  )
}
