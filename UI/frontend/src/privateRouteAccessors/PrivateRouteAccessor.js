import { Navigate, Outlet } from 'react-router-dom';
import { useRole } from "../hooks/useRole";
import { Fragment } from 'react';
import RoleEnum from '../enums/RoleEnum';

const PrivateRouteAccessor = () => {
  const role = useRole();
  if (role !== null) {
    const isAuthenticated = role === RoleEnum.Student || role === RoleEnum.Teacher;
    return isAuthenticated ? 
    <Fragment>
        <Outlet /> 
    </Fragment>
    : <Navigate to={"/login"} replace />; // or loading indicator, etc...
  }
  return <Navigate to={"/login"} replace />;
};

export default PrivateRouteAccessor;