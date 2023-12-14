import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import Home from './home/Home'
import { Loader } from './Loader'
import Login from './log-in/Login'

export default function Controller() {
  const [user, authLoading, authError] = useAuthState(getAuth())

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
