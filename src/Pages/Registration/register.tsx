import './register.scss'; // Import your SCSS module
import useRegistration from '../../hooks/registration.hook';

const Register = () => {
  const {
    ownerName,
    setOwnerName,
    carId,
    setCarId,
    email,
    setEmail,
    handleRegistration,
    buttonEnable,
  } = useRegistration();

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
      <button
        disabled={!buttonEnable}
        onClick={handleRegistration}
        className={buttonEnable ? '' : 'disabled'}
      >Register</button>
    </div>
  );
};

export default Register;
