import { Outlet } from 'react-router-dom'

export default function LoginLayout() {
  return (
    <>
      <main id="login">
        <Outlet />
      </main>
    </>
  )
}
