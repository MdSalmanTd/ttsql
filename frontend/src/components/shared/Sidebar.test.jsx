import { LayoutDashboard, PlusCircle, ListOrdered } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menu = [
  { name: "Dashboard", icon: <LayoutDashboard />, href: "/dashboard" },
  { name: "New Trip", icon: <PlusCircle />, href: "/new-trip" },
  { name: "Trips", icon: <ListOrdered />, href: "/trips" },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <>
      {/* Glassmorphic Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col fixed h-screen w-60 p-6 backdrop-blur-lg bg-white/10 border-r border-white/20 shadow-xl z-20">
        <h2 className="text-2xl font-bold text-white mb-10">TripTracker</h2>
        <nav className="flex flex-col gap-5">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 text-white/90 hover:text-white transition font-medium ${
                location.pathname === item.href ? "text-white font-bold" : ""
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20 shadow-md p-2 flex justify-around z-50">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex flex-col items-center text-white/90 hover:text-white transition ${
              location.pathname === item.href ? "text-white font-bold" : ""
            }`}
          >
            {item.icon}
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
