import { getAuth } from 'firebase/auth'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Layout() {
  const auth = getAuth()
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user != null) {
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
