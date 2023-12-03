import React, { useState } from 'react';
import './register.scss'; // Import your SCSS module

const Register = () => {
  const [ownerName, setOwnerName] = useState<string>('');
  const [carId, setCarId] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleRegistration = () => {
    // Handle registration logic here, e.g., sending data to server or validating inputs
    console.log('Owner Name:', ownerName);
    console.log('Car ID:', carId);
    console.log('Email:', email);
  };

  return (

      <div className='register-form'>
      <div className="input-group">
        <input
          type="text"
          id="ownerName"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          placeholder="Owner-Name"
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          id="carId"
          value={carId}
          onChange={(e) => setCarId(e.target.value)}
          placeholder="Car-ID"
        />
      </div>
      <div className="input-group">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <button onClick={handleRegistration}>Register</button>
      </div>
  );
};

export default Register;
