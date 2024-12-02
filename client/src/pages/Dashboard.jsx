import { useAuth } from "../context/AuthContext";
import {
  FaUser,
  FaClipboardList,
  FaTools,
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";

const Dashboard = () => {
  const { user } = useAuth();

  // Sample data - replace with your actual data
  const stats = [
    {
      title: "Total Projects",
      value: "12",
      icon: FaClipboardList,
      color: "bg-blue-500",
    },
    {
      title: "Pending Jobs",
      value: "4",
      icon: FaTools,
      color: "bg-yellow-500",
    },
    {
      title: "Completed",
      value: "8",
      icon: FaChartLine,
      color: "bg-green-500",
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your projects today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: stat.color }}
                >
                  <stat.icon size={24} />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-lg font-bold text-gray-800">
                    {stat.value}
                  </p>
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
