import { ExitButtonProps } from '../../interfaces'

export function ExitButton(props: ExitButtonProps) {
  return (
    <button onClick={props.onClick} className={`exit button ${props.classes}`}>
      <div className="bar1 bar"></div>
      <div className="bar2 bar"></div>
    </button>
  )
}
