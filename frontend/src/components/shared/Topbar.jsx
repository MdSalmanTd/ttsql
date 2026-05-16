import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo2.png";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
        navigate("/login");
    }
  return (
    <section className="w-full bg-[#09090A] px-5 py-4 sticky top-0 z-50 md:hidden">
  <div className="flex justify-between items-center">
    
    <Link to="/" className="flex items-center gap-3">
      <img
        src={logo}
        alt="logo"
        className="w-10 h-10 rounded object-cover"
      />
      <h2 className="text-2xl text-white font-bold">TripTracker</h2>
    </Link>

   
    <button
      className="bg-white/10 p-2 rounded-full text-white"
      onClick={handleLogout}
    >
      <IoLogOut className="text-2xl" />
    </button>
  </div>
</section>

  )
};

export default Topbar;