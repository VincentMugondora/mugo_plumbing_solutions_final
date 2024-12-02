import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Booking = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/bookings/user/${user}`
        );
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
    console.log(user);
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mb-12">
      <h2 className="text-4xl font-extrabold text-gray-800 mt-8 mb-4">
        Your Bookings
      </h2>
      {bookings.length === 0 ? (
        <p className="text-lg text-gray-600">No bookings found.</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="border border-gray-300 rounded-lg shadow-md p-6 bg-white transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <h3 className="text-xl font-bold text-indigo-600 mb-2">
                {booking.plumberName}
              </h3>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(booking.appointmentDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Time:</span>{" "}
                {booking.appointmentTime}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Fees:</span> ${booking.fees}
              </p>
              <p
                className={`text-sm font-medium ${
                  booking.status === "confirmed"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Booking;
