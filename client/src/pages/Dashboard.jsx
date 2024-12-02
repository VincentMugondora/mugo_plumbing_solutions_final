import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { bookingService } from "../services/bookingService";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingService.getBookings();
        console.log("Bookings response:", response);
        setBookings(response.bookings || []);
      } catch (err) {
        console.error("Error details:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });
        setError(err.response?.data?.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const stats = {
    total: bookings.length,
    upcoming: bookings.filter((b) => new Date(b.date) > new Date()).length,
    completed: bookings.filter((b) => new Date(b.date) < new Date()).length,
    revenue: bookings.reduce((acc, b) => acc + (b.price || 0), 0),
  };

  const filteredBookings = bookings
    .filter((booking) => {
      if (filterStatus === "all") return true;
      if (filterStatus === "upcoming")
        return new Date(booking.date) > new Date();
      if (filterStatus === "completed")
        return new Date(booking.date) < new Date();
      return true;
    })
    .filter(
      (booking) =>
        booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 p-6 rounded-xl text-red-500 shadow-lg border border-red-100">
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium text-lg">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <svg
              className="w-8 h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Service Dashboard
          </h1>
          <Link
            to="/book"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-blue-200 font-medium"
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
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Booking
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Bookings", value: stats.total, color: "blue" },
            { title: "Upcoming", value: stats.upcoming, color: "green" },
            { title: "Completed", value: stats.completed, color: "purple" },
            {
              title: "Total Revenue",
              value: `$${stats.revenue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}`,
              color: "yellow",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-3 bg-${stat.color}-50 rounded-xl text-${stat.color}-500`}
                >
                  {/* Replace with proper icons */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
