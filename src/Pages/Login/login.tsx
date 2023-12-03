import { useState } from "react";
import "./login.scss"; // Import your SCSS module
import { log } from "console";
import { InputAdornment } from "@mui/material";
import { Person, CarRental, Email } from "@mui/icons-material";
const Login = () => {
  const [carId, setCarId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelection = (role: string) => {
    console.log(role);

    setSelectedRole(role);
  };
  if (selectedRole === null) {
    setSelectedRole("user");
  }

  return (
    <div className="login-page">
      <div className="role-selection">
        <button 
          className={`role-button ${selectedRole === "user" ? "active" : ""}`}
          onClick={() => handleRoleSelection("user")}
        >
          User
        </button>
        <button
          className={`role-button ${
            selectedRole === "manager" ? "active" : ""
          }`}
          onClick={() => handleRoleSelection("manager")}
        >
          Manager
        </button>
      </div>
      {selectedRole === "user" && (
        <div className="user-login">
          <div className="input-group">
            <span>
              <InputAdornment position="start">
                <CarRental className="icons" />
              </InputAdornment>
            </span>
            <input
              type="text"
              id="carId"
              value={carId}
              onChange={(e) => setCarId(e.target.value)}
              placeholder="Car-ID"
            />
          </div>
          <div className="input-group">
            <span>
              <InputAdornment position="start">
                <Person className="icons" />
              </InputAdornment>
            </span>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button className="sign-in-button">Sign In</button>
        </div>
      )}
      {selectedRole === "manager" && (
        <div className="manager-login">
   
          <div className="input-group">
            <span>
              <InputAdornment position="start">
                <Email className="icons" />
              </InputAdornment>
            </span>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="input-group">
            <span>
              <InputAdornment position="start">
                <Person className="icons" />
              </InputAdornment>
            </span>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button className="sign-in-button">Sign In</button>
        </div>
      )}
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import { InputAdornment } from "@mui/material";
// import { Person, CarRental, Email } from "@mui/icons-material";
// import "./register.scss";

// const Register = () => {
//   const [ownerName, setOwnerName] = useState<string>("");
//   const [carId, setCarId] = useState<string>("");
//   const [email, setEmail] = useState<string>("");

//   const handleRegistration = () => {
//     console.log("Owner Name:", ownerName);
//     console.log("Car ID:", carId);
//     console.log("Email:", email);
//   };

//   return (
//     <div className="register-form">
//       <div className="input-group">
//         <span>
//           <InputAdornment position="start">
//             <Person className="icons" />
//           </InputAdornment>
//         </span>
//         <input
//           type="text"
//           id="ownerName"
//           value={ownerName}
//           onChange={(e) => setOwnerName(e.target.value)}
//           placeholder="Owner-Name"
//         />
//       </div>
//       <div className="input-group">
//         <span>
//           <InputAdornment position="start">
//             <CarRental className="icons" />
//           </InputAdornment>
//         </span>
//         <input
//           type="text"
//           id="carId"
//           value={carId}
//           onChange={(e) => setCarId(e.target.value)}
//           placeholder="Car-ID"
//         />
//       </div>
//       <div className="input-group">
//         <span>
//           <InputAdornment position="start">
//             <Email className="icons" />
//           </InputAdornment>
//         </span>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//       </div>
//       <button onClick={handleRegistration}> Register</button>
//     </div>
//   );
// };

// export default Register;
