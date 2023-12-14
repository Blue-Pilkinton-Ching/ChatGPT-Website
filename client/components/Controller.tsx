import { getAuth } from 'firebase/auth'
import { useEffect } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, getFirestore } from 'firebase/firestore'
import Home from './home/Home'
import { Loader } from './Loader'
import Login from './log-in/Login'

export default function Controller() {
  const [user, authLoading, authError] = useAuthState(getAuth())
  const [data, settingsLoading, settingsError] = useCollection(
    collection(getFirestore(), `settings/${''}`)
  )

  //   useEffect(() => {
  //     auth.onAuthStateChanged((user) => {
  //       if (user != null) {
  //       } else {
  //       }
  //     })
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [])

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
