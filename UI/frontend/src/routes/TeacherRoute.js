import React from "react";
import { Route } from "react-router-dom";
import TeacherHome from "../pages/teacher/TeacherHome";
import TeacherPrivateRouteAccessor from "../privateRouteAccessors/TeacherPrivateRouteAccessor";
import CreateCourse from "../pages/teacher/course/CreateCourse";
import MyCourses from "../pages/teacher/course/MyCourses";

const TeacherRoute = () => (
    <Route path="/" element={<TeacherPrivateRouteAccessor />}>
        <Route path="" element={<TeacherHome />} />

        <Route path="courses">
          <Route path="own" element={<MyCourses />} />
          <Route path="create" element={<CreateCourse />} />
        </Route>
    </Route>
  );

export default TeacherRoute;
