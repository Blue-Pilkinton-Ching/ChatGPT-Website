import { useState } from 'react'

import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { SignInButton } from './SignInButton'
import Logos from '../../auth-logos'
import { Loader } from '../Loader'
import { SignInWithEmail } from './SignInWithEmail'

function SignIn() {
  const [signingIn, setSigningIn] = useState(false)
  const [emailWarning, setEmailWarning] = useState('')
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

  function onEmailBack() {
    setEmailSignIn(false)
  }

  function onSubmit(email: string, password: string, creatingEmail: boolean) {
    if (creatingEmail) {
      createUserWithEmailAndPassword(getAuth(), email, password).catch(
        (error) => {
          let warning = error.code
          switch (error.code) {
            case 'auth/email-already-exists':
              warning = 'Email already exists on another account'
              break
            case 'auth/email-already-in-use':
              warning = 'Email already exists on another account'
              break
            case 'auth/invalid-email':
              warning = 'Invalid email'
              break
            case 'auth/invalid-password':
              warning = 'Invalid password. Must be at least six charactors'
              break
            case 'auth/weak-password':
              warning = 'Weak password. Must be at least six charactors'
              break
            default:
              break
          }
          setEmailWarning(warning)
          console.error(error)
          setSigningIn(false)
        }
      )
    } else {
      signInWithEmailAndPassword(getAuth(), email, password).catch((error) => {
        let warning = error.code
        switch (error.code) {
          case 'auth/email-already-exists':
            warning = 'Email already exists on another account'
            break
          case 'auth/invalid-email':
            warning = 'Invalid email'
            break
          case 'auth/invalid-password':
            warning = 'Invalid password.'
            break
          case 'auth/missing-password':
            warning = 'Missing password!'
            break
          case 'auth/invalid-login-credentials':
            warning = 'Email or password is incorrect.'
            break
          default:
            break
        }
        setEmailWarning(warning)
        console.error(error)
        setSigningIn(false)
      })
    }
  }

  return (
    <main className="login">
      {signingIn ? (
        <Loader text="Signing in..." />
      ) : (
        <div className="center sign-in">
          {emailSignIn ? (
            <SignInWithEmail
              onBack={onEmailBack}
              onSubmit={onSubmit}
              warning={emailWarning}
            />
          ) : (
            <>
              <h1>Sign in Method</h1>
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
                  setEmailWarning('')
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
