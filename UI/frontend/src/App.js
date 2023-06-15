import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Fragment } from "react";
import LandingPage from "./pages/auth/LandingPage";
import StudentRegister from "./pages/auth/StudentRegister";
import TeacherRegister from "./pages/auth/TeacherRegister";
import LoginPage from "./pages/auth/LoginPage";
import { ToastContainer, toast } from "react-toastify";
import CourseDetails from "./pages/course/CourseDetails";
import { useRole } from "./hooks/useRole";
import RoleEnum from "./enums/RoleEnum";
import StudentRoute from "./routes/StudentRoute";
import TeacherRoute from "./routes/TeacherRoute";
import AllCourses from "./pages/course/AllCourses";
import PrivateRouteAccessor from "./privateRouteAccessors/PrivateRouteAccessor";
import UserProfile from "./pages/user/UserProfile";
import WatchCourse from "./pages/course/WatchCourse";
import { useEffect } from "react";
import { getCurrentUser } from "./api/agent";
import { batch, useDispatch } from "react-redux";
import {
  setDisplayName,
  setEmail,
  setId,
  setProvider,
  setRole,
  setUsername,
} from "./store/slices/userInfo";
import { setTransferContract } from "./store/slices/contractInfo";
import CategoriesPage from "./pages/categories/CategoriesPage";
import EditCourse from "./pages/course/EditCourse";

import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./constants/addresses";
import { CONTRACT_ABI } from "./constants/abi";
import UserOptions from "./pages/user/UserOptions";
import { useState } from "react";
import Loading from "./components/loading/Loading";

const App = () => {
  const [loading, setLoading] = useState(false);
  const userRole = useRole();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getProvider = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      toast.error(
        "Metamask yüklü değil, lütfen satın alma işlemleri için metamask eklentisini edinin!"
      );
    } else {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const transferContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );
      batch(() => {
        dispatch(setProvider(provider));
        dispatch(setTransferContract(transferContract));
      });
    }
  };

  const loadCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      if (user !== null) {
        batch(() => {
          dispatch(setDisplayName(user.displayName));
          dispatch(setEmail(user.email));
          dispatch(setUsername(user.username));
          dispatch(setId(user.id));
          dispatch(setRole(user.role[0]));
        });

        const path = location.pathname;
        if(path !== "/" || path !== "/teacher/register" || path !== "/student/register" || path !== "/login") {
          navigate(path);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    setLoading(true);
    loadCurrentUser();
    getProvider();
    setLoading(false);
  }, []);

  return loading ? <Loading /> : (
    <Fragment>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>
        {userRole === RoleEnum.Student
          ? StudentRoute()
          : userRole === RoleEnum.Teacher
          ? TeacherRoute()
          : null}

        <Route path="/courses" element={<PrivateRouteAccessor />}>
          <Route path="" element={<AllCourses />} />
          <Route path=":id" element={<CourseDetails />} />
          <Route path=":id/watch" element={<WatchCourse />} />
          <Route path=":id/edit" element={<EditCourse />} />
          <Route path=":id/modules/:mid/edit" element={<EditCourse />} />
        </Route>

        <Route path="/categories" element={<PrivateRouteAccessor />}>
          <Route path=":id" element={<CategoriesPage />} />
        </Route>

        <Route path="/user" element={<PrivateRouteAccessor />}>
          {/* <Route path="edit" element={<AllCourses />} />*/}
          <Route path=":id" element={<UserProfile />} />
          <Route path="me" element={<UserProfile />} />
          <Route path="options" element={<UserOptions />} />
        </Route>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/teacher/register" element={<TeacherRegister />} />
        <Route path="/student/register" element={<StudentRegister />} />
      </Routes>
    </Fragment>
  );
};

export default App;
