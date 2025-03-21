import React, { useState } from 'react';
import './App.css';

const PropertyInquiryForm = () => {
  const initialFormData = {
    fullName: '',
    email: '',
    phone: '',
    contactMode: '',
    propertyType: [],
    location: '',
    bhkType: [],
    otherBHK: '',
    purpose: '',
    minBudget: '',
    maxBudget: '',
    finance: '',
    timeline: '',
    amenities: '',
    considerations: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      setSuccessMessage('Submitting your form...');
      setTimeout(async () => {
        try {
          const response = await fetch('http://localhost:3001/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            setSuccessMessage('Form submitted successfully! Redirecting...');
            setTimeout(() => {
              setFormData(initialFormData);
              setSubmitted(false);
              setSuccessMessage('');
            }, 2000);
          } else {
            setSuccessMessage('Failed to submit the form. Please try again.');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          setSuccessMessage('An error occurred. Please try again later.');
        }
      }, 500);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim()) newErrors.email = 'Valid Email is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Valid Phone Number is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Property Inquiry Form</h2>
        <p>Greetings! ☺</p>
        <p>Thank you for reaching out to Property Plateau Realty! Kindly take a moment to fill out this short questionnaire:</p>
        <form onSubmit={handleSubmit}>
          <h3>1. Basic Information</h3>
          <input name="fullName" type="text" placeholder="Full Name" onChange={handleChange} value={formData.fullName} />
          {submitted && errors.fullName && <span className="error">{errors.fullName}</span>}

          <input name="email" type="email" placeholder="Email" onChange={handleChange} value={formData.email} />
          {submitted && errors.email && <span className="error">{errors.email}</span>}

          <input name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} value={formData.phone} />
          {submitted && errors.phone && <span className="error">{errors.phone}</span>}

          <label>Preferred Mode of Contact:</label>
          <select name="contactMode" onChange={handleChange} value={formData.contactMode}>
            <option value="">Select</option>
            <option value="Call">Call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
          </select>

        
          <h3>2. Property Preferences</h3>
          <label>Looking for:</label>
          <div className="checkbox-group">
            <label><input type="checkbox" name="propertyType" value="Apartment" onChange={handleChange} checked={formData.propertyType.includes('Apartment')} /> Apartment</label>
            <label><input type="checkbox" name="propertyType" value="Villa" onChange={handleChange} checked={formData.propertyType.includes('Villa')} /> Villa</label>
            <label><input type="checkbox" name="propertyType" value="Plot" onChange={handleChange} checked={formData.propertyType.includes('Plot')} /> Plot</label>
            <label><input type="checkbox" name="propertyType" value="Commercial" onChange={handleChange} checked={formData.propertyType.includes('Commercial')} /> Commercial Property</label>
          </div>


          <input name="location" type="text" placeholder="Preferred Location(s)" onChange={handleChange} value={formData.location} />

      
          <label>BHK Type:</label>
          <div className="checkbox-group">
            <label><input type="checkbox" name="bhkType" value="1 BHK" onChange={handleChange} checked={formData.bhkType.includes('1 BHK')} /> 1 BHK</label>
            <label><input type="checkbox" name="bhkType" value="2 BHK" onChange={handleChange} checked={formData.bhkType.includes('2 BHK')} /> 2 BHK</label>
            <label><input type="checkbox" name="bhkType" value="3 BHK+" onChange={handleChange} checked={formData.bhkType.includes('3 BHK+')} /> 3 BHK+</label>
            <label><input type="checkbox" name="bhkType" value="Other" onChange={handleChange} checked={formData.bhkType.includes('Other')} /> Other:</label>
            <input name="otherBHK" type="text" placeholder="Specify if other" onChange={handleChange} value={formData.otherBHK} />
          </div>

          <label>Purpose:</label>
          <select name="purpose" onChange={handleChange} value={formData.purpose}>
            <option value="">Select</option>
            <option value="New Home">New Home</option>
            <option value="Investment">Investment</option>
          </select>
          <h3>3. Budget & Financing</h3>
          <input name="minBudget" type="number" placeholder="Min Budget (₹)" onChange={handleChange} value={formData.minBudget} />
          <input name="maxBudget" type="number" placeholder="Max Budget (₹)" onChange={handleChange} value={formData.maxBudget} />

          <label>Do you require home finance assistance?</label>
          <div className="radio-group">
            <label><input type="radio" name="finance" value="Yes" onChange={handleChange} checked={formData.finance === 'Yes'} /> Yes</label>
            <label><input type="radio" name="finance" value="No" onChange={handleChange} checked={formData.finance === 'No'} /> No</label>
          </div>
          <label>Planned Purchase Timeline:</label>
          <select name="timeline" onChange={handleChange} value={formData.timeline}>
            <option value="">Select</option>
            <option value="Immediate">Immediate</option>
            <option value="3-6 Months">3-6 Months</option>
            <option value="6+ Months">6+ Months</option>
          </select>

          <label>Specific Amenities or Features:</label>
          <textarea name="amenities" placeholder="Describe desired amenities" onChange={handleChange} value={formData.amenities}></textarea>

          <label>Other Important Considerations:</label>
          <textarea name="considerations" placeholder="Any additional comments" onChange={handleChange} value={formData.considerations}></textarea>

          <button type="submit">Submit</button>
          <div className="form-footer">
            {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyInquiryForm;
