import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { FirebaseApp, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

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

  return (
    <>
      <div className="container"></div>
    </>
  )
}

export default LoginPage
