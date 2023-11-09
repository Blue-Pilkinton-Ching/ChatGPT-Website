import { Route, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import FrogPage from './components/FrogPage'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<LoginPage />} />
    {/* <Route path="/frogs/:name" element={<FrogPage />} /> */}
  </Route>
)
