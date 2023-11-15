import { SignInButtonProps } from '../../Interfaces/firebase'

export function SignInButton(props: SignInButtonProps) {
  return (
    <button
      className="sign-in-button"
      onClick={props.onClickCallback}
      style={{ backgroundColor: `${props.bgColor}` }}
    >
      <img className="sign-in-button-img" src={props.imgSrc} alt="logo" />
      <span
        className="sign-in-button-text"
        style={{ color: `${props.textColor}` }}
      >
        {props.text}
      </span>
    </button>
  )
}
