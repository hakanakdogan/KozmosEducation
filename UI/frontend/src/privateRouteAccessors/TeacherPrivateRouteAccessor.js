import { Navigate, Outlet } from 'react-router-dom';
import { useRole } from "../hooks/useRole";
import { Fragment } from 'react';
import RoleEnum from '../enums/RoleEnum';

const TeacherPrivateRouteAccessor = () => {
  const role = useRole();
  if (role !== null) {
    const isAuthenticated = role === RoleEnum.Teacher;
    return isAuthenticated ? 
    <Fragment>
        <Outlet /> 
    </Fragment>
    : <Navigate to={"/"} replace />; // or loading indicator, etc...
  }
  return <Navigate to={"/login"} replace />;
};

export default TeacherPrivateRouteAccessor;