import React from "react";

function List() {
  const fruits = ["apple", "banana", "cherry", "date", "elderberry"];
  const users = [
    {
      id: 1,
      name: "Hamza",
      age: 24,
    },
    {
      id: 2,
      name: "Ali",
      age: 25,
    },
    {
      id: 3,
      name: "Ahmed",
      age: 26,
    },
  ];
  return (
    <div>
      <h1>List of Fruits</h1>
      <ul>
        {fruits.map((fruit, index) => {
          return <li key={index}>{fruit}</li>;
        })}
      </ul>
      <h1>List of Users</h1>
      {users.map((student, index) => {
        return (
          <div key={student.id}>
            <h2>{student.name}</h2>
            <p>{student.age}</p>
          </div>
        );
      })}
    </div>
  );
}

export default List;
