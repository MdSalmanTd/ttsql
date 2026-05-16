import { Link, useLocation } from "react-router-dom"; 
import { useAuth } from "../../context/AuthContext";
import { adminLinks, userLinks } from "../../constants";

const Bottombar = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const links = user?.role === "admin" ? adminLinks : userLinks;

  return (
    <section className="flex justify-center items-center w-full 
     sticky bottom-0 rounded-t-[20px] bg-[#09090A] px-5 py-4 md:hidden z-50">
        <ul className="flex gap-5 justify-center items-center">
          {links.map((link) => {
            const isActive = pathname === link.route;

            return (
              <li key={link.label}
                className={`group rounded-lg font-medium transition-all duration-200 ${isActive
                  ? "bg-white text-black"
                  : "text-white hover:bg-white hover:text-black"
                  }`}
              >
                <Link to={link.route}
                  className="flex flex-col items-center gap-1 p-2 transition-all duration-200"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`w-5 h-5 transition-all duration-200 ${isActive
                      ? "brightness-0"
                      : "group-hover:invert"
                      }`}
                  />
                  <p className="text-sm">{link.label}</p>
                </Link>
              </li>
            );
          })}
        </ul>
    </section>
  )
};

export default Bottombar;