import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    costGuess: '',
    spidrPin: ''
  });
  const [emailError, setEmailError] = useState('');
  const [pinError, setPinError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'email') {
      // Basic email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }
  };

  const formatSpidrPin = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Format as ####-####-####-####
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1-');
    return formatted.slice(0, 19); // Max length with dashes
  };

  const handleSpidrPinChange = (e) => {
    const formattedValue = formatSpidrPin(e.target.value);
    setFormData(prevData => ({
      ...prevData,
      spidrPin: formattedValue
    }));
    // PIN regex: 16 digits with dashes
    const pinRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    if (formattedValue.length === 19 && !pinRegex.test(formattedValue)) {
      setPinError('PIN must be 16 digits in the format ####-####-####-####.');
    } else if (formattedValue.length < 19) {
      setPinError('PIN must be 16 digits in the format ####-####-####-####.');
    } else {
      setPinError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError || pinError) return;
    
    // Check if all required fields are filled
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
    if (!allFieldsFilled) {
      alert('Please fill out all required fields.');
      return;
    }
    
    console.log('Form Data:', formData);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      costGuess: '',
      spidrPin: ''
    });
    setEmailError('');
    setPinError('');
    setIsSubmitted(false);
  };

  // Success page component
  if (isSubmitted) {
    return (
      <div className="App success-page-container">
        <div className="success-content">
          <h1>✅ Form Submitted Successfully!</h1>
          <div className="submission-details">
            <h2>Your Submission Details:</h2>
            <div className="details-grid">
              <div className="detail-item">
                <strong>Name:</strong> {formData.firstName} {formData.lastName}
              </div>
              <div className="detail-item">
                <strong>Phone:</strong> {formData.phoneNumber}
              </div>
              <div className="detail-item">
                <strong>Email:</strong> {formData.email}
              </div>
              <div className="detail-item">
                <strong>Cost Guess:</strong> ${formData.costGuess}
              </div>
              <div className="detail-item">
                <strong>Spidr PIN:</strong> {formData.spidrPin}
              </div>
            </div>
          </div>
          <p className="thank-you-message">
            Thank you for your interest in our air fryer! We'll be in touch soon.
          </p>
          <button onClick={handleReset} className="reset-button">
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App form-page-container">
      <form onSubmit={handleSubmit} className="air-fryer-form">
        <h1>Air Fryer Interest Form</h1>
        
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="(555) 123-4567"
            pattern="[\d\s\(\)\-\+]+"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={`form-input${emailError ? ' error' : ''}`}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="costGuess">Guess the air fryer's cost:</label>
          <input
            type="number"
            id="costGuess"
            name="costGuess"
            value={formData.costGuess}
            onChange={handleInputChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="spidrPin">A very, very secret 16-digit Spidr PIN:</label>
          <input
            type="text"
            id="spidrPin"
            name="spidrPin"
            value={formData.spidrPin}
            onChange={handleSpidrPinChange}
            placeholder="####-####-####-####"
            pattern="\d{4}-\d{4}-\d{4}-\d{4}"
            maxLength="19"
            required
            className={`form-input${pinError ? ' error' : ''}`}
          />
          {pinError && <p className="error-message">{pinError}</p>}
        </div>

        <button 
          type="submit"
          className="submit-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
