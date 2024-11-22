import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownTimer, setDropdownTimer] = useState(null);

  const handleLogout = () => {
    logout();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownEnter = (dropdownName) => {
    clearTimeout(dropdownTimer);
    setActiveDropdown(dropdownName);
  };

  const handleDropdownLeave = (dropdownName) => {
    const timer = setTimeout(() => {
      setActiveDropdown(null);
    }, 1000);
    setDropdownTimer(timer);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimer) clearTimeout(dropdownTimer);
    };
  }, [dropdownTimer]);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Left side - Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-black py-3">
              <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-black hover:text-blue-600 transition-colors">
              Home
            </Link>
            <div 
              className="relative group"
              onMouseEnter={() => handleDropdownEnter('services')}
              onMouseLeave={() => handleDropdownLeave('services')}
            >
              <button className="text-black hover:text-blue-600 transition-colors">
                Services
              </button>
              <div className={`absolute left-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-[60] ${
                activeDropdown === 'services' ? 'block' : 'hidden'
              }`}>
                <Link
                  to="/services/residential"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Residential Plumbing
                </Link>
                <Link
                  to="/services/commercial"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Commercial Plumbing
                </Link>
                <Link
                  to="/services/emergency"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Emergency Services
                </Link>
              </div>
            </div>
            <div 
              className="relative group"
              onMouseEnter={() => handleDropdownEnter('pages')}
              onMouseLeave={() => handleDropdownLeave('pages')}
            >
              <button className="text-black hover:text-blue-600 transition-colors">
                Pages
              </button>
              <div className={`absolute left-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-[60] ${
                activeDropdown === 'pages' ? 'block' : 'hidden'
              }`}>
                <Link
                  to="/blog"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Blog
                </Link>
                <Link
                  to="/testimonials"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Testimonials
                </Link>
                <Link
                  to="/book-appointment"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
            <Link
              to="/plumbers"
              className="text-black hover:text-blue-600 transition-colors"
            >
              Our Plumbers
            </Link>
            <Link
              to="/contact"
              className="text-black hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Profile Dropdown */}
                <div 
                  className="relative group"
                  onMouseEnter={() => handleDropdownEnter('profile')}
                  onMouseLeave={() => handleDropdownLeave('profile')}
                >
                  <button className="flex items-center space-x-2 text-black hover:text-blue-600">
                    <img
                      src={user.avatar || "/default-avatar.png"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border border-gray-200"
                    />
                    <span>{user.name || "Profile"}</span>
                  </button>
                  <div className={`absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-[60] ${
                    activeDropdown === 'profile' ? 'block' : 'hidden'
                  }`}>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/bookings"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-black hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="mobile-menu-button text-black">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <Link to="/" className="block py-2 px-4 text-sm text-black hover:bg-gray-100">
          Home
        </Link>
        <Link
          to="/services"
          className="block py-2 px-4 text-sm text-black hover:bg-gray-100"
        >
          Services
        </Link>
        <Link
          to="/blog"
          className="block py-2 px-4 text-sm text-black hover:bg-gray-100"
        >
          Blog
        </Link>
        <Link
          to="/testimonials"
          className="block py-2 px-4 text-sm text-black hover:bg-gray-100"
        >
          Testimonials
        </Link>
        <Link
          to="/book-appointment"
          className="block py-2 px-4 text-sm text-black hover:bg-gray-100"
        >
          Book Appointment
        </Link>
        <Link
          to="/plumbers"
          className="block py-2 px-4 text-sm text-black hover:bg-gray-100"
        >
          Our Plumbers
        </Link>
        <Link
          to="/contact"
          className="block py-2 px-4 text-sm text-black hover:bg-gray-100"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
