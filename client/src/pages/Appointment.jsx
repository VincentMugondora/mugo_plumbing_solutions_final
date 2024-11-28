import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useEffect, useContext, useState } from "react";
import { assets } from "../assets/assets";
import RelatedPlumbers from "../components/RelatedPlumbers";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Appointment = () => {
  const { plumberId } = useParams(); // Changed from docId to plumberId
  const { plumbers, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [plumberInfo, setPlumberInfo] = useState(null); // Changed from docInfo to plumberInfo
  const [plumberSlots, setPlumberSlots] = useState([]); // Changed from docSlots to plumberSlots
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchPlumberInfo = () => {
    // Find the plumber by ID
    const plumberInfo = plumbers.find((plumber) => plumber._id === plumberId);
    setPlumberInfo(plumberInfo);
  };

  const getAvailableSlots = () => {
    setPlumberSlots([]);

    // Getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // Getting date with the index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // Setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        // Format the time with AM/PM
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true, // Enable AM/PM format
        });

        // Add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setPlumberSlots((prev) => [...prev, timeSlots]);
    }
  };

  const handleBookAppointment = async () => {
    if (!slotTime) {
      alert('Please select a time slot');
      return;
    }

    if (!user) {
      alert('Please login to book an appointment');
      navigate('/login');
      return;
    }

    // Get the selected date from plumberSlots
    const selectedDate = plumberSlots[slotIndex][0].datetime;
    
    const bookingData = {
      plumberId: plumberInfo._id,
      plumberName: plumberInfo.name,
      appointmentDate: selectedDate.toISOString().split('T')[0],
      appointmentTime: slotTime,
      fees: plumberInfo.fees,
      userId: user.uid,
      userName: user.displayName || user.email,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      console.log('Sending booking data:', bookingData);
      
      // Make sure this URL matches your backend port (5000)
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Handle success
    } catch (error) {
      console.log('Booking error:', error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchPlumberInfo();
  }, [plumbers, plumberId]);

  useEffect(() => {
    if (plumberInfo) {
      getAvailableSlots();
    }
  }, [plumberInfo]);

  return (
    plumberInfo && (
      <div className="container">
        {/* ------- Plumber Details ------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="">
            <img
              className="bg-primary w-[40vw] object-left-top h-[40vh] object-cover sm:max-w-72 rounded-lg"
              src={plumberInfo.image}
              alt={plumberInfo.name} // Use plumberInfo.name for alt text
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* -------- Plumber Info: name, speciality, experience -------- */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {plumberInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex item-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {plumberInfo.speciality} - {plumberInfo.experience}
              </p>
            </div>

            {/* ------- Plumber About ------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {plumberInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {plumberInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* ------- Booking Slots ------- */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-grey-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {plumberSlots.length > 0 &&
              plumberSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-700"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          {/* Display available times for the selected slot */}
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {plumberSlots.length > 0 &&
              slotIndex < plumberSlots.length &&
              plumberSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* Book Appointment Button */}
          <button 
            onClick={handleBookAppointment}
            disabled={!slotTime}
            className={`text-white text-sm font-light px-14 py-3 rounded-full my-6 ${
              slotTime ? 'bg-primary hover:bg-primary/90' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Book an appointment
          </button>
        </div>

        {/* ------- Listing Related Doctors ------- */}
        <RelatedPlumbers plumberId={plumberId} city={plumberInfo.city} />
      </div>
    )
  );
};

export default Appointment;
