import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://mugo-plumbing-solutions-final.onrender.com/api/auth/login",
        formData
      );
      if (response.status === 200) {
        await login(formData.email, formData.password);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-400 to-blue-700 p-6 sm:p-12">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg transform transition-all hover:shadow-2xl duration-300">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please sign in to continue
        </p>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-blue-300 to-blue-600 hover:from-blue-700 hover:to-blue-300 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-2 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/register"
            className="text-sm font-medium text-purple-600 hover:underline"
          >
            Don’t have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
