import React from "react";
import { UserContext } from "../../../providers/user.provider";
import { Navigate } from "react-router-dom";
import useNotification from "../../../hooks/notification.hook";

interface IGuardProps {
  children: React.ReactNode;
  allowedRoles?: Array<string>;
}
const RoleGuard = ({ children, allowedRoles = [] }: IGuardProps) => {
  const { setNotification } = useNotification()
  const userContext = React.useContext(UserContext);
  if (userContext?.user?.email || userContext.user?.carID) {
    if (!allowedRoles.length) {
      return (<div>{children}</div>)
    }
    if (!allowedRoles.includes(userContext.user?.role.roleName as string)) {
      return (<Navigate to={'/no-access'} replace />)
    } else
      return (<div>{children}</div>);
  } else {
    console.log('user: ', userContext.user)
    setNotification({ message: "You have to login first!", status: 'error', })
    window.alert('You have to login first!')
    return (<Navigate to={'/signin'} replace />)
  }
};

export default RoleGuard;
