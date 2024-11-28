import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = await user.getIdToken(); // Get Firebase token
        const response = await fetch(`/api/bookings?userId=${user.uid}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch bookings');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {location.state?.message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {location.state.message}
        </div>
      )}
      
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <div 
            key={booking._id} 
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{booking.plumberName}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(booking.appointmentDate).toLocaleDateString()} at {booking.appointmentTime}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Status: <span className="capitalize">{booking.status}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">Fee: ${booking.fees}</p>
              </div>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            No bookings found
          </p>
        )}
      </div>
    </div>
  );
};

export default Booking;
