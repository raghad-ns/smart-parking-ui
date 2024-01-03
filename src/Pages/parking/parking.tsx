import { useState } from "react";
import { InputAdornment } from "@mui/material";
import { LocationOn,Label } from '@mui/icons-material';

import './parking.scss'

const Parking = () => {
    const [location, setLocation] = useState<string>("");
    const [customId, setCustomId] = useState<string>("");
    const handleAddParking = () => {
        console.log("Location: ", location);
        console.log("Custom-id:",customId );


    }
    return (
        <div className="parking-page">
            <div className="input-group">
                <span>
                    <InputAdornment position="start">
                        <LocationOn className='icons' />
                    </InputAdornment>
                </span>
                <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
            </div>
            <div className="input-group">
                <span>
                    <InputAdornment position="start">
                        <Label  className='icons' />
                    </InputAdornment>
                </span>
                <input type="text" id="customId" value={customId} onChange={(e) => setCustomId(e.target.value)} placeholder="Custom-Id"/>
            </div>
            <button onClick={handleAddParking}>Add Parking</button>
        </div>
    )
}

export default Parking;