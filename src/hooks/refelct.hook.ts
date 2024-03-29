import { useEffect, useState } from "react";
import { reflectEnrollmentService } from "../services/reflect.service";
import { validateInputs } from "../utils/utils";
import useNotification from "./notification.hook";

export const useReflect = () => {
  const [owner, setOwner] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [valid, setValid] = useState<boolean>(true);
  const [buttonEnable, setButtonEnable] = useState<boolean>(false);
  const { setNotification } = useNotification();
  const checkButtonEnable = () => {
    setButtonEnable(
      owner !== "" &&
        phone !== "" &&
        amount !== "" &&
        password !== "" &&
        confirmPassword !== ""
    );
  };

  useEffect(() => {
    checkButtonEnable();
    // eslint-disable-next-line
  }, [owner, phone, amount, password, confirmPassword]);
  const handleAddReflect = async () => {
    if (
      validateInputs([
        { value: owner, type: "name" },
        { value: password, type: "password" },
        { value: confirmPassword, type: "password" },
        { value: amount, type: "number" },
        { value: phone, type: "mobileNo" },
      ])
    ) {
      setValid(true);
      try {
        const reflect = await reflectEnrollmentService({
          owner,
          password,
          mobileNo: phone,
          amount: Number(amount),
          cofirm_password: confirmPassword,
        });
        if ((await reflect).state) {
          setNotification({
            message: "Reflect account added successfully",
            status: "success",
          });
          // window.alert("Reflect account added successfully");

          setPhone("");
          setOwner("");
          setAmount("");
          setPassword("");
          setConfirmPassword("");
        } else {
          setNotification({
            message: "Invalid credentials, please check your data",
            status: "error",
          });
          // window.alert("invalid credentials, please check your data");
        }
      } catch (error) {
        setNotification({
          message: "Something went wrong, please try again!",
          status: "error",
        });
        // window.alert("Something went wrong, please try again!");
      }
    } else {
      setNotification({
        message: "Invalid input format, please check it out!",
        status: "error",
      });
      // window.alert("Invalid input format, please check it out!");
      setValid(false);
    }
  };

  return {
    valid,
    owner: { value: owner, setState: setOwner },
    phone: { value: phone, setState: setPhone },
    amount: { value: amount, setState: setAmount },
    password: { value: password, setState: setPassword },
    confirmPassword: { value: confirmPassword, setState: setConfirmPassword },
    handleAddReflect,
    buttonEnable,
  };
};
