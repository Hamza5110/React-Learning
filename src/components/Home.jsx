import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Home({ name, age }) {
  const greets = "Learn Coding!!!";
  return (
    <>
      <Navbar />
      <div>Wekcome {greets}</div>
      <h1>Hello {name}</h1>
      <h1>Age: {age}</h1>
      <Footer />
    </>
  );
}
 
export default Home;
