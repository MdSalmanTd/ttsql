import { Routes, Route } from 'react-router-dom'

import { Dashboard, AddTrip, AllTrips, EditTrip } from './_root/pages'

import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import Login from './_auth/forms/LoginForm'
import Register from './_auth/forms/RegisterForm'
import ForgotPasswordForm from './_auth/forms/ForgotPasswordForm'
import ResetPasswordForm from './_auth/forms/ResetPasswordForm'
import HomePage from './pages/HomePage'

import './global.css'

const App = () => {


  return (
    <main className="min-h-screen w-full">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<AuthLayout />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPasswordForm />} />
          <Route path='/reset-password' element={<ResetPasswordForm />} />
        </Route>

        {/* Protected routes */}
        <Route element={<RootLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/add-trip' element={<AddTrip />} />
          <Route path='/all-trips' element={<AllTrips />} />
          <Route path='/edit-trip/:id' element={<EditTrip />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App