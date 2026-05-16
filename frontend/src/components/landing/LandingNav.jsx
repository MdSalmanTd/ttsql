import React from "react";
import { Link } from "react-router-dom";

const display = { fontFamily: "'Barlow Condensed', sans-serif" };

export default function LandingNav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-15 flex items-center justify-between px-8 md:px-14 bg-black/60 backdrop-blur-xl border-b border-white/[0.07]">
      {/* Logo */}
      <Link to="/" style={display} className="text-[17px] font-black tracking-[0.22em] uppercase text-white">
        [ TT ]
      </Link>

      {/* Desktop */}
      <div className="hidden lg:flex items-center gap-8">
        <Link
          to="/login"
          style={display}
          className="text-[12px] font-medium tracking-[0.16em] uppercase text-white/60 hover:text-white transition-colors duration-150"
        >
          Sign In
        </Link>
        <Link
          to="/register"
          style={display}
          className="text-[11px] font-bold tracking-[0.2em] uppercase px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-150"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile */}
      <div className="flex lg:hidden items-center gap-3">
        <Link to="/login"    style={display} className="text-[11px] font-medium tracking-widest uppercase text-white/50 hover:text-white transition-colors">Sign In</Link>
        <Link to="/register" style={display} className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 border border-white/40 text-white hover:border-white transition-colors">Start</Link>
      </div>
    </nav>
  );
}