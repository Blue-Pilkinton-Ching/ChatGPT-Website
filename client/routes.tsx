import { Route, createRoutesFromElements } from 'react-router-dom'
import LoginLayout from './components/log-in/LoginLayout'
import HomeLayout from './components/home/HomeLayout'
import LoginPage from './components/log-in/LoginPage'
import HomePage from './components/home/HomePage'

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
