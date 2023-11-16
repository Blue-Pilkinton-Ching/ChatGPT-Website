import { useEffect } from 'react'

import { FirebaseApp, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { SignInButton } from './SignInButton'
import Logos from '../auth-logos'

function LoginPage() {
  let app: FirebaseApp

  useEffect(() => {
    const config = {
      apiKey: 'AIzaSyB4enbUPLq5f3CJnoGSiNIoxV-MLmlAuVQ',
      authDomain: 'chatgpt-website-c81b2.firebaseapp.com',
      projectId: 'chatgpt-website-c81b2',
      storageBucket: 'chatgpt-website-c81b2.appspot.com',
      messagingSenderId: '348741570396',
      appId: '1:348741570396:web:dfd779c008b66a00e3fb99',
      measurementId: 'G-9KW9PBHY99',
    }
    app = initializeApp(config)
  }, [])

  function OnSignInButtonClick(service: string) {
    console.log('Clicked')
    return service
  }

  return (
    <>
      <div id="sign-in">
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
    </>
  )
}

export default LoginPage
