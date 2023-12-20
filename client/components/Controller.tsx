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
  getDocs,
  startAfter,
} from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'
import { useEffect } from 'react'
import { Settings, ThreadHeader } from '../../interfaces'
import OpenAI from 'openai'
import { useGlobalState } from '../hooks/useGlobalState'

export default function Controller() {
  const [user, authLoading, authError] = useAuthState(getAuth())
  const globalRef = useGlobalRef()
  const [fsSettings] = useDocument(doc(getFirestore(), `settings/${user?.uid}`))
  const { globalState, setGlobalState } = useGlobalState()

  const threadsPerLoad = 3

  async function GetMoreThreads() {
    if (globalState.reachedFinalThreadHeader || user == null) {
      return
    }

    const headersCollection = collection(
      getFirestore(),
      `threads/${user?.uid}/headers`
    )

    const q =
      globalRef.latestDoc == null
        ? query(
            headersCollection,
            limit(threadsPerLoad),
            orderBy('lastEdited', 'desc')
          )
        : query(
            headersCollection,
            limit(threadsPerLoad),
            orderBy('lastEdited', 'desc'),
            startAfter(globalRef.latestDoc)
          )

    const headers = await getDocs(q)

    if (!headers.empty) {
      globalRef.latestDoc = headers.docs[headers.docs.length - 1]

      setGlobalState((oldState) => ({
        ...oldState,
        threadHeaders: [
          ...oldState.threadHeaders,
          ...headers.docs.map((doc) => doc.data() as ThreadHeader),
        ],
        reachedFinalThreadHeader: headers.docs.length < threadsPerLoad,
      }))
    } else {
      setGlobalState((oldState) => ({
        ...oldState,
        reachedFinalThreadHeader: true,
      }))
    }
  }

  useEffect(() => {
    globalRef.getMoreThreads = GetMoreThreads
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalRef.latestDoc, user])

  useEffect(() => {
    globalRef.getMoreThreads()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

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
