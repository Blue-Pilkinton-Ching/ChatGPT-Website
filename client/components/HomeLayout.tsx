import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
  return (
    <>
      <main className="home">
        <Outlet />
      </main>
    </>
  )
}
