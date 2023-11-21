import { FormEvent } from 'react'
import { ThreadPanelProps } from '../../../interfaces.ts'
import { useGlobalContext } from '../../hooks/useGlobalContext.tsx'

export default function ThreadPanel(props: ThreadPanelProps) {
  const globalContext = useGlobalContext()

  function handleExit(event: FormEvent<HTMLButtonElement>) {
    event?.preventDefault()
    props.onExitButton()
  }

  console.log(globalContext)

  return (
    <>
      <div className={`threads-panel ${props.show ? 'show' : 'hide'}`}>
        <button onClick={handleExit} className="exit-threads-panel"></button>
      </div>
    </>
  )
}
