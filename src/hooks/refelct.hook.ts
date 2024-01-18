import { useState } from "react";
import { reflectEnrollmentService } from "../services/reflect.service";
import { validateInputs } from "../utils/utils";

export const useReflect = () => {
  const [owner, setOwner] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
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
      try {
        const reflect = await reflectEnrollmentService({
          owner,
          password,
          mobileNo: phone,
          amount: Number(amount),
          cofirm_password: confirmPassword,
        });
        if ((await reflect).state) {
          window.alert("Reflect account added successfully");
          setPhone("");
          setOwner("");
          setAmount("");
          setPassword("");
          setConfirmPassword("");
        } else {
          window.alert("invalid credentials, please check your data");
        }
      } catch (error) {
        window.alert("Something went wrong, please try again!");
      }
    } else {
      window.alert("Invalid input format, please check it out!");
    }
  };

  return {
    owner: { value: owner, setState: setOwner },
    phone: { value: phone, setState: setPhone },
    amount: { value: amount, setState: setAmount },
    password: { value: password, setState: setPassword },
    confirmPassword: { value: confirmPassword, setState: setConfirmPassword },
    handleAddReflect,
  };
};
