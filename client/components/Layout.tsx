import { getAuth } from 'firebase/auth'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function Layout() {
  const auth = getAuth()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/home')
      } else {
        if (location.pathname === '/home') {
          navigate('/')
        }
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
