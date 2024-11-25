import axios from 'axios';

const API_URL = '/api/bookings';

export const bookingService = {
  createBooking: async (bookingData) => {
    const response = await axios.post(API_URL, bookingData);
    return response.data;
  },

  getUserBookings: async () => {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  },

  updateBookingStatus: async (bookingId, status) => {
    const response = await axios.patch(`${API_URL}/status`, { bookingId, status });
    return response.data;
  }
}; 