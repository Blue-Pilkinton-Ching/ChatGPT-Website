import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
  return (
    <>
      <main id="home">
        <Outlet />
      </main>
    </>
  )
}
