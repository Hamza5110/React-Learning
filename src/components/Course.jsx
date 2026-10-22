import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function FreeCourse({course}) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-green-600 mb-6 mt-20">Free Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          course.map((c)=>{
            return <div className="bg-white shadow-lg rounded-xl p-5 broder hover:shahdow-xl" key={c.id}>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">FREE</span>
              <h3 className="text-lg font-semibold mt-4">{c.title}</h3>
              <p className="text-gray-600 mt-2">$499</p>
              <button className="mt-5 bg-green-500 text-white px-4 py-2 rounded-lg">Buy Now</button>
              </div>
          })
        }
      </div>
    </div>
  );
}

function PaidCourse({course}) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Paid Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          course.map((c)=>{
            return <div className="bg-white shadow-lg rounded-xl p-5 broder hover:shahdow-xl" key={c.id}>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">PREMIUM</span>
              <h3 className="text-lg font-semibold mt-4">{c.title}</h3>
              <p className="text-gray-600 mt-2">$499</p>
              <button className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-lg">Buy Now</button>
              </div>
          })
        }
      </div>
    </div>
  );
}

function Course() {
  const [course, setCourse] = useState([]);
  
  useEffect(() => {
    const getCourse = async () => {
      try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        setCourse(data.slice(0, 20));
      } catch (error) {
        console.log("Error in fetching courses", error);  
      }
    }
    getCourse();
  }, []);

  const freeCourse = course.filter(course => course.completed === false);
  const paidCourse = course.filter(course => course.completed === true);
  
  return (
    <>
    <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
      <PaidCourse course={paidCourse}/>
      <FreeCourse course={freeCourse}/>
      </div>
      <Footer />
    </>
  );
}

export default Course;
