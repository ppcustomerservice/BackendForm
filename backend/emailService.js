const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (formData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.TO_EMAIL,
    subject: `New Property Inquiry from ${formData.fullName}`,
    html: `
      <h1>Property Inquiry Details</h1>
      <p><strong>Full Name:</strong> ${formData.fullName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Preferred Contact Mode:</strong> ${formData.contactMode}</p>
      <p><strong>Property Type:</strong> ${formData.propertyType.join(', ')}</p>
      <p><strong>Location:</strong> ${formData.location}</p>
      <p><strong>BHK Type:</strong> ${formData.bhkType.join(', ')} ${formData.otherBHK ? `, Other: ${formData.otherBHK}` : ''}</p>
      <p><strong>Purpose:</strong> ${formData.purpose}</p>
      <p><strong>Budget Range:</strong> ₹${formData.minBudget} - ₹${formData.maxBudget}</p>
      <p><strong>Finance Assistance:</strong> ${formData.finance}</p>
      <p><strong>Timeline:</strong> ${formData.timeline}</p>
      <p><strong>Amenities:</strong> ${formData.amenities}</p>
      <p><strong>Additional Considerations:</strong> ${formData.considerations}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
