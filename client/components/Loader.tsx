import { LoaderProps } from '../../interfaces'

export function Loader(props: LoaderProps) {
  return (
    <div className="center">
      <span className="loader"></span>
      <h5>{props.text}</h5>
    </div>
  )
}
