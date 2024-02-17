import React, { ChangeEvent, useEffect } from "react";
import { parkingEnrollmentService } from "../services/parking.service";
import { validateInputs } from "../utils/utils";
import useNotification from "./notification.hook";

export const useParkingEnrollment = () => {
  const [location, setLocation] = React.useState("");
  const [customid, setCustomid] = React.useState("");
  const [buttonEnable, setButtonEnable] = React.useState<boolean>(false);
  const { setNotification } = useNotification();
  const checkButtonEnable = () => {
    setButtonEnable(location !== "" && customid !== "");
  };
  useEffect(() => {
    checkButtonEnable();
    // eslint-disable-next-line
  }, [customid, location]);

  const handleAddParking = async () => {
    if (validateInputs([{ value: customid, type: "customid" }])) {
      const parkingEnrollment = await parkingEnrollmentService({
        customid,
        location,
      });
      if (parkingEnrollment.state) {
        parkingEnrollment.value.statusCode === 201
          ? setNotification({
              message: "Parking added successfully!",
              status: "success",
            })
          : setNotification({
              message: "Invalid parking credentials!",
              status: "error",
            });
      } else {
        setNotification({
          message: "Something went wrong, please try again!",
          status: "error",
        });
      }
      setCustomid("");
      setLocation("");
    } else
      setNotification({
        message: "Invalid input format, please check it out!",
        status: "error",
      });
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
    buttonEnable,
  };
};
