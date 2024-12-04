import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaTools, FaSignOutAlt, FaUsers } from "react-icons/fa";

const SideNavbar = () => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "Plumbers", path: "/plumber-dashboard", icon: <FaUsers /> },
    { name: "Services", path: "/admin-dashboard", icon: <FaTools /> },
  ];

  const handleLogout = () => {
    console.log("Logged out"); // Replace with your logout logic
  };

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700 flex items-center justify-center">
        Mugo Plumbing
      </div>
      <nav className="flex-1 mt-4">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-3 hover:bg-gray-700 rounded-md transition ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-3 hover:bg-red-700 transition bg-red-600 rounded-none"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;
