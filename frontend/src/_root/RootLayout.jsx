import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import Sidebar from '@/components/shared/Sidebar'
import Topbar from '@/components/shared/Topbar'
import Bottombar from '@/components/shared/Bottombar'

const RootLayout = () => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/" />
  return (
    <div className="w-full md:flex">
      <Sidebar />
      <Topbar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  )
}

export default RootLayout