import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <main id="home">
        <Outlet />
      </main>
    </>
  )
}
