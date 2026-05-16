import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/images/Cybertrack.avif";

const display = { fontFamily: "'Barlow Condensed', sans-serif" };
const body    = { fontFamily: "'Barlow', sans-serif" };

export default function LandingHero() {
  return (
    <section className="relative flex flex-col justify-end h-screen min-h-160 overflow-hidden">
      {/* ── Real photo background ── */}
      <img
        src={image}
        alt="TrackTruck fleet vehicle"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* ── Left-to-right dark veil ── */}
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.62) 42%, rgba(0,0,0,0.18) 100%)",
        }}
      />

      {/* ── Top-to-bottom fade ── */}
      <div
        className="absolute inset-0 z-2"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.08) 48%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 z-3"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.45) 65%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.45) 65%, transparent 100%)",
        }}
      />

      {/* ── Hero copy ── */}
      <div className="relative z-10 px-8 md:px-14 pb-20 max-w-4xl">
        <p
          style={display}
          className="text-[10px] font-medium tracking-[0.4em] uppercase text-white/40 mb-6"
        >
          Fleet Operations Platform
        </p>

        <h1
          style={{ ...display, fontSize: "clamp(48px, 13vw, 152px)" }}
          className="font-black uppercase leading-[0.87] tracking-[-0.01em] text-white mb-8 mt-12 md:mt-0"
        >
          Track
          <span className="block text-white/20">Truck</span>
        </h1>

        <p
          style={body}
          className="text-[14px] md:text-[15px] font-light tracking-[0.07em] uppercase text-white/50 max-w-105 leading-[1.75] mb-12"
        >
          One unbreakable command layer for every trip, vehicle, and handoff.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/register"
            style={display}
            className="inline-block text-[12px] font-bold tracking-[0.22em] uppercase px-10 py-3.5 bg-white text-black border border-white hover:bg-transparent hover:text-white transition-colors duration-200"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            style={display}
            className="inline-block text-[12px] font-bold tracking-[0.22em] uppercase px-10 py-3.5 bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/5 transition-colors duration-200"
          >
            Sign In →
          </Link>
        </div>
      </div>

      {/* ── Hard bottom fade into black ── */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-linear-to-t from-black via-black/60 to-transparent z-9 pointer-events-none" />
    </section>
  );
}