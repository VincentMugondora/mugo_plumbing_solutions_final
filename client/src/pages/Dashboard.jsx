import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back, User!</h1>
          <button 
            onClick={() => navigate('/book')} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + New Booking
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Bookings', value: '156', change: '+12', color: 'bg-blue-500' },
            { title: 'Upcoming Bookings', value: '48', change: '+5', color: 'bg-green-500' },
            { title: 'Today\'s Bookings', value: '8', change: '+1', color: 'bg-purple-500' },
            { title: 'Completed', value: '124', change: '+3', color: 'bg-yellow-500' },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  {/* You can add icons here */}
                </div>
              </div>
              <p className="text-sm text-green-600 mt-2">{stat.change} this week</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center p-4 border rounded-lg">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    {/* Calendar Icon */}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">Booking #{item}234</h3>
                    <p className="text-sm text-gray-600">John Doe • 2:00 PM - 3:00 PM</p>
                  </div>
                  <div className="ml-4">
                    <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                      Confirmed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
            <div className="space-y-4">
              {[
                { time: '09:00 AM', name: 'Sarah Smith', status: 'Upcoming' },
                { time: '11:30 AM', name: 'Mike Johnson', status: 'In Progress' },
                { time: '02:00 PM', name: 'Emily Brown', status: 'Upcoming' },
                { time: '04:30 PM', name: 'David Wilson', status: 'Upcoming' },
              ].map((booking, index) => (
                <div key={index} className="flex items-center p-3 border rounded-lg">
                  <div className="mr-3">
                    <p className="font-medium text-sm">{booking.time}</p>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{booking.name}</h3>
                    <p className="text-sm text-gray-600">{booking.status}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 