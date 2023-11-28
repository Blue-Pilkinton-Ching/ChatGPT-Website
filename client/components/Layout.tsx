import { getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { GlobalData } from '../../interfaces'

export default function Layout() {
  const auth = getAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [globalData, setGlobalData] = useState<GlobalData>()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setGlobalData({ ...globalData, insideNewChat: true })
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
