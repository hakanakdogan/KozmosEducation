import React from "react";
import StudentHeader from "./StudentHeader";
import TeacherHeader from "./TeacherHeader";
import AuthHeader from "./AuthHeader";
import Footer from "../layout/Footer";
import { useRole } from "../../hooks/useRole";
import RoleEnum from "../../enums/RoleEnum";

const AppLayout = ({ children }) => {
  const userRole = useRole();

  return (
    <div className="layout">
      {
        userRole === RoleEnum.Student ? <StudentHeader />
        : userRole === RoleEnum.Teacher ? <TeacherHeader />
        : <AuthHeader />
      }
      
      <div className="layout-body">
      {children}
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
