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
    document.body.classList.toggle('menu-open');
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
      <div className="container overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side - Logo/Brand */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="text-xl font-bold text-black py-3">
                <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
              </Link>
            </div>

            {/* Navigation Links - Centered */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-black hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <div className="relative">
                <Link
                  to="/services"
                  className="text-black hover:text-blue-600 transition-colors"
                  onMouseEnter={() => handleDropdownEnter("services")}
                  onMouseLeave={() => handleDropdownLeave("services")}
                >
                  Services
                </Link>
                <div
                  className={`absolute left-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-[60] ${
                    activeDropdown === "services" ? "block" : "hidden"
                  }`}
                >
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
              <div className="relative">
                <Link
                  to="/pages"
                  className="text-black hover:text-blue-600 transition-colors"
                  onMouseEnter={() => handleDropdownEnter("pages")}
                  onMouseLeave={() => handleDropdownLeave("pages")}
                >
                  Pages
                </Link>
                <div
                  className={`absolute left-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-[60] ${
                    activeDropdown === "pages" ? "block" : "hidden"
                  }`}
                >
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
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  {/* Profile Dropdown */}
                  <div
                    className="relative group"
                    onMouseEnter={() => handleDropdownEnter("profile")}
                    onMouseLeave={() => handleDropdownLeave("profile")}
                  >
                    <button className="flex items-center space-x-2 text-black hover:text-blue-600">
                      <img
                        src={user.avatar || "/default-avatar.png"}
                        alt="Profile"
                        className="w-8 h-8 rounded-full border border-gray-200"
                      />
                      <span>{user.name || "Profile"}</span>
                    </button>
                    <div
                      className={`absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-[60] ${
                        activeDropdown === "profile" ? "block" : "hidden"
                      }`}
                    >
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
              <button
                onClick={toggleMobileMenu}
                className="mobile-menu-button text-black"
              >
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

        {/* Enhanced Mobile Menu */}
        <div
          className={`
            fixed top-0 right-0 h-full w-[min(80vw,320px)] bg-gradient-to-br from-white to-gray-50
            transform transition-all duration-300 ease-out overflow-y-auto
            ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
            md:hidden shadow-2xl backdrop-blur-sm
            border-l border-gray-100
          `}
        >
          {/* Header with Logo and Close */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* User Profile Section or Auth Buttons */}
          <div className="p-6 border-b border-gray-100">
            {user ? (
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-gray-200"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {user.name || "User"}
                  </div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="flex items-center justify-center space-x-2 w-full p-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center space-x-2 w-full p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Create Account</span>
                </Link>
              </div>
            )}
          </div>

          {/* Menu Links */}
          <div className="py-6 px-4 space-y-2">
            <Link
              to="/"
              className="block py-2 px-4 text-sm text-black hover:bg-gray-100"
            >
              Home
            </Link>
            
            {/* Services Dropdown */}
            <div className="space-y-1">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "services" ? null : "services")}
                className="flex items-center justify-between w-full py-2 px-4 text-sm text-black hover:bg-gray-100"
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 transition-transform ${activeDropdown === "services" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`pl-4 space-y-1 ${activeDropdown === "services" ? "block" : "hidden"}`}>
                <Link to="/services/residential" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">
                  Residential Plumbing
                </Link>
                <Link to="/services/commercial" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">
                  Commercial Plumbing
                </Link>
                <Link to="/services/emergency" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">
                  Emergency Services
                </Link>
              </div>
            </div>

            {/* Pages Dropdown */}
            <div className="space-y-1">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "pages" ? null : "pages")}
                className="flex items-center justify-between w-full py-2 px-4 text-sm text-black hover:bg-gray-100"
              >
                <span>Pages</span>
                <svg
                  className={`w-4 h-4 transition-transform ${activeDropdown === "pages" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`pl-4 space-y-1 ${activeDropdown === "pages" ? "block" : "hidden"}`}>
                <Link to="/blog" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">
                  Blog
                </Link>
                <Link to="/testimonials" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">
                  Testimonials
                </Link>
                <Link to="/book-appointment" className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100">
                  Book Appointment
                </Link>
              </div>
            </div>

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

          {/* Bottom Section - Profile Actions or Contact */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-50 to-transparent">
            {user ? (
              <div className="space-y-3">
                {/* Profile Dropdown */}
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === "profile" ? null : "profile")}
                    className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-50"
                  >
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>My Profile</span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${activeDropdown === "profile" ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`space-y-1 ${activeDropdown === "profile" ? "block" : "hidden"}`}>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                      My Profile
                    </Link>
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link to="/bookings" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                      My Bookings
                    </Link>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center space-x-2 w-full p-3 rounded-lg text-red-600 hover:bg-red-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/contact"
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Contact Us</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
