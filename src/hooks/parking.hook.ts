import React, { ChangeEvent } from "react";
import { parkingEnrollmentService } from "../services/parking.service";

export const useParkingEnrollment = () => {
  const [location, setLocation] = React.useState("");
  const [customid, setCustomid] = React.useState("");

  const handleAddParking = async () => {
    const parkingEnrollment = await parkingEnrollmentService({
      customid,
      location,
    });
    if (parkingEnrollment.state) {
      parkingEnrollment.value.statusCode === 201
        ? window.alert("Parking added successfully!")
        : window.alert("Invalid Parking credentials!");
    } else {
      window.alert("Something went wrong, please try again!");
    }
    setCustomid("");
    setLocation("");
  };

  const handleLocationChange = (event: ChangeEvent<{ value: unknown }>) => {
    setLocation(event.target.value as string);
  };
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return {
    customid: { value: customid, setState: setCustomid },
    location: { value: location, setState: setLocation },
    handleAddParking,
    handleLocationChange,
    capitalizeFirstLetter,
  };
};
