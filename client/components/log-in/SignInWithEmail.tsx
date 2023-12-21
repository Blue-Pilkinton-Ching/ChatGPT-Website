import { SignInWithEmailProps } from '../../../interfaces'
import { MouseEvent, useEffect, useRef, useState } from 'react'

export function SignInWithEmail(props: SignInWithEmailProps) {
  const [creatingEmail, setCreatingEmail] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const [warning, setWarning] = useState('false')

  useEffect(() => {
    console.log('propsChages')
    setWarning(props.warning)
  }, [props.warning])

  function onSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    console.log(creatingEmail)

    if (creatingEmail) {
      if (
        (confirmPasswordRef.current?.value as string) !=
        (passwordRef.current?.value as string)
      ) {
        setWarning("Passwords don't match")
        return
      }
    }

    props.onSubmit(
      emailRef.current?.value as string,
      passwordRef.current?.value as string,
      creatingEmail
    )
  }

  function onBack(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (creatingEmail) {
      setCreatingEmail(false)
    } else {
      props.onBack()
    }
  }

  return (
    <>
      <div>
        {creatingEmail ? <h1>Sign Up</h1> : <h1>Sign In</h1>}
        <hr className="sign-in-bar" />
        <br />
        <br />
        <input
          className="sign-in-text-field email-text-field text"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          ref={emailRef}
        ></input>
      </div>
      <div>
        <input
          className="sign-in-text-field password-text-field text"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          maxLength={30}
          ref={passwordRef}
        ></input>
      </div>
      {creatingEmail ? (
        <div>
          <input
            className="sign-in-text-field password-text-field text"
            type="password"
            id="password"
            name="password"
            placeholder="Confirm password"
            maxLength={30}
            ref={confirmPasswordRef}
          ></input>
        </div>
      ) : (
        ''
      )}

      {props.warning ? <p>{warning}</p> : <br />}
      <div className="email-next">
        <button
          onClick={onBack}
          className="email-back-button email-next-button button"
          type="submit"
          value="Submit"
        >
          <h3>Back</h3>
        </button>
        <button
          onClick={onSubmit}
          className="email-submit-button email-next-button button"
          type="submit"
          value="Submit"
        >
          <h3>Sign In</h3>
        </button>
      </div>
      <br />
      {creatingEmail ? (
        ' '
      ) : (
        /*eslint-disable-next-line jsx-a11y/anchor-is-valid*/
        <a className="text" href="#" onClick={() => setCreatingEmail(true)}>
          Create Account
        </a>
      )}
    </>
  )
}
