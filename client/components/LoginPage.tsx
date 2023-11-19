import { useRef, useState } from 'react'

import { FirebaseError, initializeApp } from 'firebase/app'
import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  getAuth,
  signInWithPopup,
} from 'firebase/auth'
import { SignInButton } from './SignInButton'
import Logos from '../auth-logos'
import { OAuthCredential } from 'firebase/auth'

function LoginPage() {
  const app = useRef(
    initializeApp({
      apiKey: 'AIzaSyB4enbUPLq5f3CJnoGSiNIoxV-MLmlAuVQ',
      authDomain: 'chatgpt-website-c81b2.firebaseapp.com',
      projectId: 'chatgpt-website-c81b2',
      storageBucket: 'chatgpt-website-c81b2.appspot.com',
      messagingSenderId: '348741570396',
      appId: '1:348741570396:web:dfd779c008b66a00e3fb99',
      measurementId: 'G-9KW9PBHY99',
    })
  )
  const [signingIn, setSigningIn] = useState(false)

  function OnSignInButtonClick(service: string) {
    console.log('Signing In')
    setSigningIn(true)

    let provider: AuthProvider
    let getCredentialFromResult: (
      result: UserCredential
    ) => OAuthCredential | null
    let getCredentialFromError: (error: FirebaseError) => OAuthCredential | null

    // Init services & functionality based on sign in button

    switch (service) {
      case 'google':
        provider = new GoogleAuthProvider()
        getCredentialFromResult = (result: UserCredential) => {
          return GoogleAuthProvider.credentialFromResult(result)
        }
        getCredentialFromError = (error: FirebaseError) => {
          return GoogleAuthProvider.credentialFromError(error)
        }
        break
      case 'github':
        provider = new GithubAuthProvider()
        getCredentialFromResult = (result: UserCredential) => {
          return GithubAuthProvider.credentialFromResult(result)
        }
        getCredentialFromError = (error: FirebaseError) => {
          return GithubAuthProvider.credentialFromError(error)
        }
        break
      default:
        console.error('Unknown Sign In Service')
        return
    }

    const auth = getAuth(app.current)
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = getCredentialFromResult(result)

        if (credential == null) {
          console.error('Credential is null or undefined!')
          return
        }

        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        console.log(user)
        setSigningIn(false)
      })
      .catch((error) => {
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = getCredentialFromError(error)
        // ...

        alert(`Error Signing in: ${error.code}`)
        console.error(error)
        setSigningIn(false)
      })

    return service
  }

  return (
    <>
      {signingIn ? (
        <div className="center">
          <span className="loader"></span>
          <h5>Signing in...</h5>
        </div>
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
    </>
  )
}

export default LoginPage
