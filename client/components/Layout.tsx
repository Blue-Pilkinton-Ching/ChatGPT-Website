import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Layout() {
  const auth = getAuth()
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        const db = getFirestore()

        navigate('/home')
      } else {
        navigate('/')
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Outlet />
    </>
  )
}
