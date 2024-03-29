import React, { ChangeEvent } from "react";
import { InputAdornment, MenuItem, Select } from "@mui/material";
import { LocationOn, LockPerson } from "@mui/icons-material";
import "./parking.scss";
import { useParkingEnrollment } from "../../hooks/parking.hook";
import { ViewSideManContext } from "../../providers/view-side-man.provider";

const Parking = () => {
  const viewSideManContext = React.useContext(ViewSideManContext)
  React.useEffect(() => {
    viewSideManContext.setViewSideMan && viewSideManContext.setViewSideMan(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const {
    customid,
    location,
    handleAddParking,
    handleLocationChange,
    capitalizeFirstLetter, buttonEnable
  } = useParkingEnrollment()

  return (
    <div className="page-wrapper">
      <div className="parking-page form-wrapper">
        <div className='form-title'><h1>Add parking</h1></div>
        <div className="input-group">
          <span>
            <InputAdornment position="start">
              <LocationOn className="icons" />
            </InputAdornment>
          </span>
          <Select
            className="MuiSelect-root"
            id="location"
            value={location.value}
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
              <LockPerson className="custom-id-icon" />
            </InputAdornment>
          </span>
          <input
            type="text"
            id="customId"
            className="customid"
            value={customid.value}
            onChange={(e) => customid.setState(e.target.value)}
            placeholder="Custom-Id"
          />
        </div>
        <button
          onClick={handleAddParking}
          className={buttonEnable ? 'button' : 'disabled button'}
          style={{width:'320px'}}
          disabled={!buttonEnable}>Add Parking</button>
      </div>
    </div>
  );
};

export default Parking;
