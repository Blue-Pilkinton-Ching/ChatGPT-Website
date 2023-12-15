import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import Home from './home/Home'
import { Loader } from './Loader'
import Login from './log-in/Login'
import { useGlobalRef } from '../hooks/useGlobalRef'
import { doc, getFirestore } from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'
import { useEffect } from 'react'
import { Settings } from '../../interfaces'
import OpenAI from 'openai'

export default function Controller() {
  const [user, authLoading, authError] = useAuthState(getAuth())
  const globalRef = useGlobalRef()

  const [fsSettings] = useDocument(doc(getFirestore(), `settings/${user?.uid}`))

  useEffect(() => {
    if (fsSettings?.data() == undefined) {
      return
    }

    console.log(fsSettings?.data())

    const settings = fsSettings?.data() as Settings
    globalRef.settings = settings

    const openai = new OpenAI({
      apiKey: settings.apiKey,
      dangerouslyAllowBrowser: true,
    })

    globalRef.openai = openai

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fsSettings])

  if (user) {
    return <Home />
  }
  if (authLoading) {
    return (
      <main>
        <Loader text="Signing in..." />
      </main>
    )
  }
  if (authError) {
    alert(authError.message)
    return ''
  } else {
    return <Login />
  }
}
