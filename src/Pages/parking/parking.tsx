// import { useState } from "react";
// // import { InputAdornment } from "@mui/material";
// import { InputAdornment, MenuItem, Select, Button } from "@mui/material";

// import { LocationOn,Label } from '@mui/icons-material';

// import './parking.scss'

// const Parking = () => {
//     const [location, setLocation] = useState<string>("");
//     const [customId, setCustomId] = useState<string>("");
//     const handleAddParking = () => {
//         console.log("Location: ", location);
//         console.log("Custom-id:",customId );

//     }
//     const handleLocationChange = (
//         event: React.ChangeEvent<{ value: unknown }>
//       ) => {
//         setLocation(event.target.value as string);
//       };

//     return (
//         <div className="parking-page">
//             <div className="input-group">
//                 <span>
//                     <InputAdornment position="start">
//                         <LocationOn className='icons' />
//                     </InputAdornment>
//                 </span>
//                 <Select
//                     id="location"
//                     value={location}
//                     onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
//             handleLocationChange(event as React.ChangeEvent<{ value: string }>)
//           }
//                     placeholder="Location"
//                 >
//                     <MenuItem value="hebron">Hebron</MenuItem>
//                     <MenuItem value="ramallah">Ramallah</MenuItem>
//                     <MenuItem value="nablus">Nablus</MenuItem>
//                     {/* Add more locations as needed */}
//                 </Select>
//                 {/* <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" /> */}
//             </div>
//             <div className="input-group">
//                 <span>
//                     <InputAdornment position="start">
//                         <Label  className='icons' />
//                     </InputAdornment>
//                 </span>
//                 <input type="text" id="customId" value={customId} onChange={(e) => setCustomId(e.target.value)} placeholder="Custom-Id"/>
//             </div>
//             <button onClick={handleAddParking}>Add Parking</button>
//         </div>
//     )
// }

// export default Parking;

import { useState, ChangeEvent } from "react";
import { InputAdornment, MenuItem, Select, Button } from "@mui/material";
import { LocationOn, Label } from "@mui/icons-material";
import "./parking.scss";

const Parking = () => {
  const [location, setLocation] = useState("");
  const [customId, setCustomId] = useState("");

  const handleAddParking = () => {
    console.log("Location: ", location);
    console.log("Custom-id:", customId);
  };

  const handleLocationChange = (event: ChangeEvent<{ value: unknown }>) => {
    setLocation(event.target.value as string);
  };
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="parking-page">
      <div className="input-group">
        <span>
          <InputAdornment position="start">
            <LocationOn className="icons" />
          </InputAdornment>
        </span>
        <Select
          className="MuiSelect-root"
          id="location"
          value={location}
          onChange={(event) =>
            handleLocationChange(event as ChangeEvent<{ value: unknown }>)
          }
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return <em>Location</em>;
            }
            return capitalizeFirstLetter(selected as string);
          }}
        >
          <MenuItem disabled value="">
            <em>Location</em>
          </MenuItem>
          <MenuItem value="hebron">Hebron</MenuItem>
          <MenuItem value="ramallah">Ramallah</MenuItem>
          <MenuItem value="nablus">Nablus</MenuItem>
          {/* Add more locations as needed */}
        </Select>
      </div>
      <div className="input-group">
        <span>
          <InputAdornment position="start">
            <Label className="icons" />
          </InputAdornment>
        </span>
        <input
          type="text"
          id="customId"
          value={customId}
          onChange={(e) => setCustomId(e.target.value)}
          placeholder="Custom-Id"
        />
      </div>
      <button onClick={handleAddParking}>Add Parking</button>
    </div>
  );
};

export default Parking;
