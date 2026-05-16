import React from "react";

const display = { fontFamily: "'Barlow Condensed', sans-serif" };

export default function LandingFooter() {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between px-8 md:px-14 py-4 sm:py-0 sm:h-11 h-auto gap-2 sm:gap-0 border-t border-white/[0.07] bg-black relative z-10 text-center sm:text-left">
      <span style={display} className="text-[9px] tracking-[0.32em] uppercase text-white/20">
        © {new Date().getFullYear()} TrackTruck — Fleet Operations Platform
      </span>
      <a
        href="mailto:support@tracktruck.io"
        style={display}
        className="text-[9px] tracking-[0.32em] uppercase text-white/20 hover:text-white/50 transition-colors"
      >
        Contact
      </a>
    </footer>
  );
}