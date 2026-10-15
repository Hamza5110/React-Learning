import React from "react";

function FreeCourse({courses}) {
  return (
    <>
      <h2>Free Courses</h2>
      {
        courses.map((course)=> (
          <div key={course.id}>
            <p>{course.id}</p>
            <h3>{course.title}</h3>
            <h2>{course.name}</h2>
          </div>
        ))
      }
    </>
  );
}

function PaidCourse({courses}) {
  return (
    <>
      <h2>Paid Courses</h2>
      {
        courses.map((course)=> (
          <div key={course.id}>
            <p>{course.id}</p>
            <h3>{course.title}</h3>
            <h2>{course.name}</h2>
          </div>
        ))
      }
    </>
  );
}

function Course() {
  const freeCourse = [
    {
      id: 1,
      title: "HTML CSS",
      name: "John Doe",
    },
    {
      id: 2,
      title: "JavaScript",
      name: "Jane Doe",
    }
  ];

  const paidCourse=[
    {
      id:1,
      title:"React JS",
      name:"Hamza",
    },
    
    {
      id:2,
      title:"Node JS",
      name:"Ali",
    }
  ]
  return (
    <>
      <PaidCourse courses={paidCourse}/>
      <div>Course!</div>
      <FreeCourse courses={freeCourse}/>
    </>
  );
}

export default Course;
