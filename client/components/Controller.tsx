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

const threadsPerLoad = 15

export default function Controller() {
  const [user, authLoading, authError] = useAuthState(getAuth())
  const globalRef = useGlobalRef()
  const [fsSettings] = useDocument(doc(getFirestore(), `settings/${user?.uid}`))

  const { setGlobalState } = useGlobalState()

  useEffect(() => {
    if (authLoading || authError) {
      return
    }

    globalRef.showMoreThreads = async () => {
      console.log('loading threads')
      const headers = await GetThreadHeaders()

      const headerDocs = headers.docs.map((doc, index) => {
        const data = doc.data() as ThreadHeader

        if (index === threadsPerLoad - 1) {
          globalRef.latestDoc = doc
        }

        const result = data as ThreadHeader
        return result
      })

      setGlobalState((oldState) => ({
        ...oldState,
        threadHeaders: oldState.threadHeaders.concat(headerDocs),
      }))
    }

    globalRef.showMoreThreads()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  async function GetThreadHeaders() {
    const headersCollection = collection(
      getFirestore(),
      `threads/${user?.uid}/headers`
    )

    let q

    if (globalRef.latestDoc == null) {
      q = query(
        headersCollection,
        limit(threadsPerLoad),
        orderBy('lastEdited', 'desc')
      )
    } else {
      q = query(
        headersCollection,
        limit(threadsPerLoad),
        orderBy('lastEdited', 'desc'),
        startAfter(globalRef.latestDoc)
      )
    }

    return await getDocs(q)
  }

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
