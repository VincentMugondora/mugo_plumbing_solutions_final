const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',  // or your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const emailService = {
  sendBookingConfirmation: async (booking, userEmail) => {
    // Format date and time
    const date = new Date(booking.date).toLocaleDateString();
    const time = booking.startTime;
    
    // Get service name
    const serviceName = PLUMBING_SERVICES.find(s => s.id === booking.serviceType)?.name;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Plumbing Service Booking Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Booking Confirmation</h2>
          
          <p>Thank you for scheduling a plumbing service with us!</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Booking Details:</h3>
            <p><strong>Service:</strong> ${serviceName}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Duration:</strong> ${booking.estimatedDuration} minutes</p>
            <p><strong>Address:</strong><br>
              ${booking.address.street}<br>
              ${booking.address.city}, ${booking.address.state} ${booking.address.zipCode}
            </p>
          </div>

          <div style="background-color: #fff8e6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #b45309;">Important Information:</h3>
            <ul style="padding-left: 20px;">
              <li>Please ensure someone over 18 is present at the property.</li>
              <li>Our plumber will call you 30 minutes before arrival.</li>
              <li>To reschedule or cancel, please contact us at least 24 hours in advance.</li>
            </ul>
          </div>

          <p style="color: #4b5563; font-size: 14px;">
            If you have any questions or need to make changes to your booking,
            please contact us at ${process.env.SUPPORT_PHONE} or reply to this email.
          </p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new Error('Failed to send confirmation email');
    }
  }
};

module.exports = emailService; 