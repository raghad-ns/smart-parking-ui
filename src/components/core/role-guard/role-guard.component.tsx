import React from "react";
import { UserContext } from "../../../providers/user.provider";
import { Navigate } from "react-router-dom";

interface IGuardProps {
  children: React.ReactNode;
  allowedRoles?: Array<string>;
}
const RoleGuard = ({ children, allowedRoles = [] }: IGuardProps) => {
  const userContext = React.useContext(UserContext);
  if (userContext?.user?.id) {
    if (!allowedRoles.length) {
      return (<div>{children}</div>)
    }
    if (!allowedRoles.includes(userContext.user?.role.roleName as string)) {
      window.alert('You are not allowed to access this page!')
      return (<Navigate to={'/'} />)
    } else
      return (<div>{children}</div>);
  } else {
    window.alert('You have to login first!')
    return (<Navigate to={'/signin'} replace />)
  }
};

export default RoleGuard;
