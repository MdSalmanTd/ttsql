import React from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo2.png'
import { useAuth } from '../../context/AuthContext'
import { adminLinks, userLinks } from '../../constants'
import logoutIcon from '../../assets/icons/logout.svg'

const Sidebar = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const links = user?.role === "admin" ? adminLinks : userLinks;
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }


  return (
    <nav className="hidden md:flex flex-col justify-between min-w-[270px] bg-[#09090A] px-6 py-10">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10 rounded object-cover" />
          <h2 className="text-2xl text-white font-bold">TripTracker</h2>
        </Link>

        <ul className="flex flex-col gap-5 ">
          {links.map((link) => {
            const isActive = pathname === link.route;

            return (
              <li key={link.label}
                className={`group rounded-lg font-medium transition-all duration-200 ${isActive
                  ? "bg-white text-black"
                  : "text-white hover:bg-white hover:text-black"
                  }`}
              >
                <NavLink to={link.route}
                  className="flex items-center gap-4 p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`w-5 h-5 transition-all duration-200 ${isActive
                      ? "brightness-0"
                      : "group-hover:invert"
                      }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
        <button
          onClick={handleLogout}
          className="group flex items-center gap-4 p-4 text-white hover:bg-white hover:text-black rounded-lg transition-all duration-200"
        >
          <img
            src={logoutIcon}
            alt="logout"
            className="w-5 h-5 group-hover:invert transition-all duration-200"
          />
          <span>Logout</span>
        </button>
    </nav>
  )
}

export default Sidebar