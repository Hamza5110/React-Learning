import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Course from "./components/Course";
import CreateCourse from "./components/CreateCourse";
import CourseDetail from "./components/CourseDetail";
import Signup from "./components/Signup";
import List from "./components/List";
import CreateBlog from "./components/CreateBlog";
import BlogDetail from "./components/BlogDetail";
import Profile from "./components/Profile";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/new" element={<CreateBlog />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/courses/new" element={<CreateCourse />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/list" element={<List />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
