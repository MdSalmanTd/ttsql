import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LandingNav from '../components/landing/LandingNav';
import LandingHero from '../components/landing/LandingHero';
import LandingFooter from '../components/landing/LandingFooter';

export default function HomePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-sm text-white">
        Initializing...
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="h-screen bg-black text-white selection:bg-white selection:text-black font-sans flex flex-col">
      <LandingNav />
      <LandingHero />
      <LandingFooter />
    </main>
  );
}