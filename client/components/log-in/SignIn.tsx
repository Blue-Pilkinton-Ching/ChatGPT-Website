import { useState } from 'react'

import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from 'firebase/auth'
import { SignInButton } from './SignInButton'
import Logos from '../../auth-logos'
import { Loader } from '../Loader'
import { SignInWithEmail } from './SignInWithEmail'

function SignIn() {
  const [signingIn, setSigningIn] = useState(false)

  const [emailSignIn, setEmailSignIn] = useState(false)

  function SignInWithPopup(service: string) {
    setSigningIn(true)

    let provider: AuthProvider

    // Init services & functionality based on sign in button

    switch (service) {
      case 'google':
        provider = new GoogleAuthProvider()
        break
      case 'github':
        provider = new GithubAuthProvider()
        break
      default:
        console.error('Unknown Sign In Service')
        return
    }

    signInWithPopup(getAuth(), provider).catch((error) => {
      alert(`Error Signing in: ${error.code}`)
      console.error(error)
      setSigningIn(false)
    })

    return service
  }

  return (
    <main className="login">
      {signingIn ? (
        <Loader text="Signing in..." />
      ) : (
        <div className="center sign-in">
          {emailSignIn ? (
            <SignInWithEmail
              onBack={function (): void {
                throw new Error('Function not implemented.')
              }}
              onSubmit={function (): void {
                throw new Error('Function not implemented.')
              }}
            />
          ) : (
            <>
              <h1> Sign in Method</h1>
              <hr className="sign-in-bar" />
              <br />
              <br />
              <SignInButton
                imgSrc={Logos.google}
                bgColor="#FFFFFF"
                text="Sign in with Google"
                textColor="#757575"
                onClickCallback={() => {
                  SignInWithPopup('google')
                }}
              ></SignInButton>
              <SignInButton
                imgSrc={Logos.github}
                bgColor="#333333"
                text="Sign in with Github"
                textColor="#FFFFFF"
                onClickCallback={() => {
                  SignInWithPopup('github')
                }}
              ></SignInButton>
              <SignInButton
                imgSrc={Logos.email}
                bgColor="#db4437"
                text="Sign in with Email Password"
                textColor="#FFFFFF"
                onClickCallback={() => {
                  setEmailSignIn(true)
                }}
              ></SignInButton>
            </>
          )}
        </div>
      )}
    </main>
  )
}

export default SignIn
