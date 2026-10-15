import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Course from "./components/Course";
import Signup from "./components/Signup";

function App() {
  const age=10; // JavaScript
  return (
    <Routes>
      <Route path="/" element={<Home name="Hamza" age={age} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/course" element={<Course />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;