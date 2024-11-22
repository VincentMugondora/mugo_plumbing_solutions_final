import { useState, useEffect, useContext } from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope, FaHome, FaUserTie } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';

const Book = () => {
  const { plumbers } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    serviceType: '',
    plumberId: '',
    message: ''
  });

  const [availablePlumbers, setAvailablePlumbers] = useState([]);
  const [addressSubmitted, setAddressSubmitted] = useState(false);

  useEffect(() => {
    console.log('Plumbers from context:', plumbers);
  }, [plumbers]);

  const findNearbyPlumbers = () => {
    console.log('Finding plumbers...', plumbers);
    if (plumbers && plumbers.length > 0) {
      setAvailablePlumbers(plumbers);
      console.log('Set available plumbers:', plumbers);
    }
  };

  const handleAddressSubmit = () => {
    if (formData.address.trim()) {
      findNearbyPlumbers();
      setAddressSubmitted(true);
      console.log('Address submitted, available plumbers:', availablePlumbers);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'address') {
      setAddressSubmitted(false);
      setFormData(prev => ({ ...prev, plumberId: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  useEffect(() => {
    console.log('Available Plumbers:', availablePlumbers);
    console.log('Context Plumbers:', plumbers);
  }, [availablePlumbers, plumbers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Book Our <span className="text-blue-600">Professional Services</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Schedule an appointment with our expert plumbers for reliable and efficient service
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 backdrop-blur-sm bg-white/90">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <FaUser className="text-blue-600 mr-3" />
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Service Location
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                      focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleAddressSubmit}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                      transform hover:scale-105 transition-all duration-200 flex items-center gap-2
                      shadow-md hover:shadow-lg whitespace-nowrap h-[50px]"
                    >
                      <FaHome className="text-lg" />
                      Find Plumbers
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {addressSubmitted && availablePlumbers.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <FaUserTie className="text-blue-600 mr-3" />
                  Select Your Plumber
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {availablePlumbers.map((plumber) => (
                    <label
                      key={plumber._id}
                      className={`
                        border rounded-lg p-4 cursor-pointer transition-all
                        ${formData.plumberId === plumber._id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'}
                      `}
                    >
                      <input
                        type="radio"
                        name="plumberId"
                        value={plumber._id}
                        checked={formData.plumberId === plumber._id}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <div className="flex items-center gap-4">
                        {plumber.image && (
                          <img 
                            src={plumber.image} 
                            alt={plumber.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">{plumber.name}</span>
                          <span className="text-sm text-gray-600">Experience: {plumber.experience}</span>
                          <span className="text-sm text-gray-600">
                            Specialty: {plumber.speciality}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <FaCalendarAlt className="inline mr-2" />
                Preferred Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium mb-2">
                <FaClock className="inline mr-2 text-blue-600" />
                Preferred Time
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 
                focus:ring-blue-500 focus:border-transparent transition-all duration-200
                appearance-none bg-white cursor-pointer
                bg-[url('/chevron-down.svg')] 
                bg-no-repeat bg-[center_right_1rem] bg-[length:20px]
                hover:border-blue-400"
                required
              >
                <option value="" disabled>Select a time</option>
                <option value="morning">Morning (8AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 4PM)</option>
                <option value="evening">Evening (4PM - 8PM)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Service Type
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a service</option>
                <option value="emergency">Emergency Plumbing</option>
                <option value="drain">Drain Cleaning & Unclogging</option>
                <option value="leak">Leak Detection & Repair</option>
                <option value="installation">Fixture Installation</option>
                <option value="water-heater">Water Heater Services</option>
                <option value="pipe">Pipe Repair & Replacement</option>
                <option value="bathroom">Bathroom Plumbing</option>
                <option value="kitchen">Kitchen Plumbing</option>
                <option value="sewer">Sewer Line Services</option>
                <option value="maintenance">Preventive Maintenance</option>
                <option value="inspection">Plumbing Inspection</option>
                <option value="backflow">Backflow Prevention</option>
                <option value="gas">Gas Line Services</option>
                <option value="sump-pump">Sump Pump Services</option>
                <option value="water-treatment">Water Treatment Systems</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Additional Details
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                focus:ring-blue-500 focus:border-transparent"
                placeholder="Please provide any additional information about your service needs..."
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={!formData.plumberId}
                className={`
                  inline-flex items-center px-6 py-3 rounded-lg font-medium
                  transform transition-all duration-300 
                  ${!formData.plumberId 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95'}
                  text-white
                `}
              >
                Schedule Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Book; 