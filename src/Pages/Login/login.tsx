import  { useState } from 'react';
import './login.scss'; // Import your SCSS module
import { log } from 'console';

const Login= () => {
  
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelection = (role: string) => {
    console.log(role);
    
    setSelectedRole(role);
  };
  if (selectedRole === null) {
    setSelectedRole('user');
  }

  return (
    <div className="login-page">
      <div className="role-selection">
        <button
          className={`role-button ${selectedRole === 'user' ? 'active' : ''}`}
          onClick={() => handleRoleSelection('user')}
        >
          User
        </button>
        <button
          className={`role-button ${selectedRole === 'manager' ? 'active' : ''}`}
          onClick={() => handleRoleSelection('manager')}
        >
          Manager
        </button>
      </div>
      {selectedRole === 'user' && (
        <div className="user-login">
          <input type="text" placeholder="Car ID" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
        </div>
      )}
      {selectedRole === 'manager' && (
        <div className="manager-login">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
        </div>
      )}
    </div>
  );
};

export default Login;

