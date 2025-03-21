const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sendEmail } = require('./emailService');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/submit-form', async (req, res) => {
  try {
    const formData = req.body;
    await sendEmail(formData);
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
