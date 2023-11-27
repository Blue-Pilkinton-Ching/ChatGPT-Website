import { useState } from 'react'

import { initializeApp } from 'firebase/app'
import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  User,
  UserCredential,
  getAuth,
  signInWithPopup,
} from 'firebase/auth'
import { SignInButton } from './SignInButton'
import Logos from '../../auth-logos'
import { OAuthCredential } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useGlobalData } from '../../hooks/useGlobalData'
import { getFirestore } from 'firebase/firestore'

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
  const navigate = useNavigate()
  const { globalData, setGlobalData } = useGlobalData()

  auth.onAuthStateChanged((user) => {
    if (user) {
      userSignIn(user)
    } else {
      // No user is signed in.
    }
  })

  function OnSignInButtonClick(service: string) {
    console.log('Signing In')
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

    signInWithPopup(auth, provider)
      .then((result) => {
        userSignIn(result.user)
      })
      .catch((error) => {
        alert(`Error Signing in: ${error.code}`)
        console.error(error)
        setSigningIn(false)
      })

    return service
  }

  function userSignIn(user: User) {
    const db = getFirestore()
    console.log(user)

    setGlobalData({ ...globalData, db, auth })
    setSigningIn(false)
    navigate('/home')
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
