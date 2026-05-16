import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AuthLayout = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <Navigate to="/dashboard" />
      ) : (
        <>
          <section className='h-screen w-full flex items-center justify-center bg-black'>
            <Outlet />
          </section>
        </>
      )}
    </>
  )
}

export default AuthLayout