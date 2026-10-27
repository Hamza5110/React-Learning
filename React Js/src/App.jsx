import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Course from "./components/Course";
import Signup from "./components/Signup";
import List from "./components/List";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Course />} />
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
