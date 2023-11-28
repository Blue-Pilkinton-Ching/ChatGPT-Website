import { useState } from 'react'

import { initializeApp } from 'firebase/app'
import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  getAuth,
  signInWithPopup,
} from 'firebase/auth'
import { SignInButton } from './SignInButton'
import Logos from '../../auth-logos'
import { OAuthCredential } from 'firebase/auth'
import { Loader } from '../Loader'

const app = initializeApp({
  apiKey: 'AIzaSyB4enbUPLq5f3CJnoGSiNIoxV-MLmlAuVQ',
  authDomain: 'chatgpt-website-c81b2.firebaseapp.com',
  projectId: 'chatgpt-website-c81b2',
  storageBucket: 'chatgpt-website-c81b2.appspot.com',
  messagingSenderId: '348741570396',
  appId: '1:348741570396:web:dfd779c008b66a00e3fb99',
  measurementId: 'G-9KW9PBHY99',
})

const auth = getAuth(app)

function LoginPage() {
  const [signingIn, setSigningIn] = useState(false)
  function OnSignInButtonClick(service: string) {
    setSigningIn(true)

    let provider: AuthProvider
    let getCredentialFromResult: (
      result: UserCredential
    ) => OAuthCredential | null

    // Init services & functionality based on sign in button

    switch (service) {
      case 'google':
        provider = new GoogleAuthProvider()
        getCredentialFromResult = (result: UserCredential) => {
          return GoogleAuthProvider.credentialFromResult(result)
        }
        break
      case 'github':
        provider = new GithubAuthProvider()
        getCredentialFromResult = (result: UserCredential) => {
          return GithubAuthProvider.credentialFromResult(result)
        }
        break
      default:
        console.error('Unknown Sign In Service')
        return
    }

    signInWithPopup(auth, provider).catch((error) => {
      alert(`Error Signing in: ${error.code}`)
      console.error(error)
      setSigningIn(false)
    })

    return service
  }

  return (
    <main className="login">
      {signingIn ? (
        <Loader />
      ) : (
        <div className="center" id="sign-in">
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
              OnSignInButtonClick('google')
            }}
          ></SignInButton>
          <SignInButton
            imgSrc={Logos.github}
            bgColor="#333333"
            text="Sign in with Github"
            textColor="#FFFFFF"
            onClickCallback={() => {
              OnSignInButtonClick('github')
            }}
          ></SignInButton>
        </div>
      )}
    </main>
  )
}

export default LoginPage
