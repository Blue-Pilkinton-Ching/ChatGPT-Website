import { Route, createRoutesFromElements } from 'react-router-dom'
import LoginLayout from './components/LoginLayout'
import HomeLayout from './components/HomeLayout'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'

export default createRoutesFromElements(
  <>
    <Route path="/" element={<LoginLayout />}>
      <Route index element={<LoginPage />} />
    </Route>
    <Route path="/home" element={<HomeLayout />}>
      <Route index element={<HomePage />} />
    </Route>
  </>
)
