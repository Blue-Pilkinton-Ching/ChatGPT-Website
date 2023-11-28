import { Route, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './components/log-in/LoginPage'
import HomePage from './components/home/HomePage'

export default createRoutesFromElements(
  <>
    <Route path="/" element={<Layout />}>
      <Route index element={<LoginPage />} />
    </Route>
    <Route path="/home" element={<Layout />}>
      <Route index element={<HomePage />} />
    </Route>
  </>
)
