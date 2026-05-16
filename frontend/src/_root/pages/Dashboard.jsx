import React from 'react'
import { useAuth } from '../../context/AuthContext';
import LiveMap from '../../components/LiveMap';


const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="w-full z-0 min-h-screen overflow-hidden bg-black text-white">
      <LiveMap isAdmin={user?.role === 'admin'} />
    </div>
  )
}

export default Dashboard