import React from "react";
import { Route } from "react-router-dom";
import StudentPrivateRouteAccessor from "../privateRouteAccessors/StudentPrivateRouteAccessor";
import StudentHome from "../pages/student/StudentHome";
import AttendeedCourses from "../pages/student/course/AttendeedCourses";

const StudentRoute = () => {
  return (
    <Route path="/" element={<StudentPrivateRouteAccessor />}>
      <Route path="" element={<StudentHome />} />

      <Route path="courses">
        <Route path="attended" element={<AttendeedCourses />} />
      </Route>
    </Route>
  );
};

export default StudentRoute;
