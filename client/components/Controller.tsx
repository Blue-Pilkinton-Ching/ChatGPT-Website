import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import Home from './home/Home'
import { Loader } from './Loader'
import Login from './log-in/Login'
import { useGlobalRef } from '../hooks/useGlobalRef'
import {
  doc,
  getFirestore,
  collection,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useDocument, useCollectionOnce } from 'react-firebase-hooks/firestore'
import { useEffect } from 'react'
import { Settings, ThreadHeader } from '../../interfaces'
import OpenAI from 'openai'
import {} from 'firebase/firestore'
import { useGlobalState } from '../hooks/useGlobalState'

export default function Controller() {
  const [user, authLoading, authError] = useAuthState(getAuth())
  const globalRef = useGlobalRef()
  const [fsSettings] = useDocument(doc(getFirestore(), `settings/${user?.uid}`))

  const { setGlobalState } = useGlobalState()

  const [fsHeaders] = useCollectionOnce(
    query(
      collection(getFirestore(), `threads/${user?.uid}/headers`),
      limit(5),
      orderBy('lastEdited', 'desc')
    )
  )

  useEffect(() => {
    if (fsHeaders) {
      const threadHeaders = fsHeaders.docs.map((element) => {
        return element.data()
      }) as ThreadHeader[]

      setGlobalState((oldState) => ({
        ...oldState,
        threadHeaders: threadHeaders,
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fsHeaders])

  useEffect(() => {
    if (fsSettings?.data() == undefined) {
      return
    }

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
