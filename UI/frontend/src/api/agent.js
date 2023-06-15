import {getAllCourses, getUserCourses, getTeacherCourses, getCourse, attendCourse, createCourse, updateCourse} from "./course";
import {getCourseModule, createCourseModule, updateCourseModule, deleteCourseModule} from "./courseModule";
import {getLectures, createLecture, updateLecture, deleteLecture} from "./lecture";
import {getProfile, createProfile, updateProfile} from "./profile";
import {getAllCategories, getCategory} from "./category";
import {getCurrentUser, getUserById} from "./user";
import {createPost} from "./social";


export {getAllCourses, getUserCourses, getTeacherCourses, getCourse, attendCourse, createCourse, updateCourse};
export {getCourseModule, createCourseModule, updateCourseModule, deleteCourseModule};
export {getLectures, createLecture, updateLecture, deleteLecture};
export {getProfile, createProfile, updateProfile};
export {getAllCategories, getCategory};
export {getCurrentUser, getUserById};
export {createPost};