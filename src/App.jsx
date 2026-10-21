import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Course from "./components/Course";
import Signup from "./components/Signup";
import Bonus from "./components/Bonus";
import Now from "./components/Now";
import Event from "./components/Event";
import Form from "./components/Form";
import List from "./components/List";

function App() {
  const user = true;

  return (
    <Routes>
      // It is a ternary operator
      {/* {user ? (
        <>
          <Route path="/" element={<Home name="Hamza" />} />
          <Route path="/courses" element={<Course />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
      )} */} 
      // It is Logical and operator
      {user && (
        <>
          <Route path="/" element={<Home name="Hamza" />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/list" element={<List />} />
        </>
      )}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
