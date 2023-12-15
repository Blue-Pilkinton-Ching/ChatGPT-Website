import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import Home from './home/Home'
import { LoaderProps } from './Loader'
import Login from './log-in/Login'
import { useGlobalRef } from '../hooks/useGlobalRef'
import { doc, getFirestore } from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'
import { useEffect } from 'react'
import { Settings } from '../../interfaces'

export default function Controller() {
  const [user, authLoading, authError] = useAuthState(getAuth())
  const globalRef = useGlobalRef()

  const [fsSettings] = useDocument(doc(getFirestore(), `settings/${user?.uid}`))

  useEffect(() => {
    const settings = fsSettings?.data() as Settings
    globalRef.settings = settings
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fsSettings])

  if (user) {
    return <Home />
  }
  if (authLoading) {
    return (
      <main>
        <Loader />
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
