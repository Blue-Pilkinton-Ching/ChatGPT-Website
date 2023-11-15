import { SignInButtonProps } from '../../Interfaces/firebase'

export function SignInButton(props: SignInButtonProps) {
  return (
    <button className="sign-in-button" onClick={props.onClickCallback}>
      <img className="sign-in-button-img" src={props.imgSrc} alt="logo" />
      <span className="sign-in-button-text">{props.text}</span>
    </button>
  )
}
