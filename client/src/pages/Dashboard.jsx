import { useAuth } from "../context/AuthContext";
import { FaUser, FaClipboardList, FaTools, FaChartLine } from "react-icons/fa";

const Dashboard = () => {
  const { user } = useAuth();

  // Sample data - replace with your actual data
  const stats = [
    {
      title: "Total Projects",
      value: "12",
      icon: FaClipboardList,
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Pending Jobs",
      value: "4",
      icon: FaTools,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      title: "Completed",
      value: "8",
      icon: FaChartLine,
      color: "from-green-400 to-green-600",
    },
  ];

  // Sample bookings data - replace with your actual data from API
  const bookings = [
    {
      id: 1,
      service: "Pipe Repair",
      date: "2024-03-25",
      time: "10:00 AM",
      status: "pending",
      description: "Kitchen sink pipe leakage",
      location: "123 Main St",
    },
    {
      id: 2,
      service: "Bathroom Installation",
      date: "2024-03-28",
      time: "2:00 PM",
      status: "confirmed",
      description: "New bathroom fixtures installation",
      location: "456 Oak Ave",
    },
    {
      id: 3,
      service: "Water Heater Service",
      date: "2024-03-30",
      time: "11:30 AM",
      status: "completed",
      description: "Annual maintenance check",
      location: "789 Pine Rd",
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <div className="container mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Here's what's happening with your projects today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 bg-gradient-to-r ${stat.color} text-white shadow-lg transition-transform transform hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-4 bg-white rounded-full shadow-md text-gray-700">
                  <stat.icon size={32} />
                </div>
                <div className="text-right">
                  <p className="text-sm uppercase">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bookings Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Upcoming Bookings
          </h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {booking.service}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {booking.date} at {booking.time}
                  </p>
                  <p className="text-sm text-gray-500">{booking.description}</p>
                  <p className="text-sm text-gray-500">{booking.location}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
