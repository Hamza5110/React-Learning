import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Course from "./components/Course";
import Signup from "./components/Signup";
import Bonus from "./components/Bonus";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home name="Hamza" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/courses" element={<Course />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/bonus" element={<Bonus />} />
    </Routes>
  );
}

export default App;