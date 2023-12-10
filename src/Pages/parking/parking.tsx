import { useState } from "react";
import { InputAdornment } from "@mui/material";
import { LocationOn, GppGood } from '@mui/icons-material';
import './parking.scss'

const Parking = () => {
    const [location, setLocation] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const handleAddParking = () => {
        console.log("Location: ", location);
        console.log("Status: ", status);


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
                        <GppGood className='icons' />
                    </InputAdornment>
                </span>
                <input type="text" id="status" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status"/>
            </div>
            <button onClick={handleAddParking}>Add Parking</button>
        </div>
    )
}

export default Parking;