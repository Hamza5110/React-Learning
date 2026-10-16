import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";


/// API Example
function Home() {
  const [posts, setPosts] = useState([]);

  const getPost= async ()=> {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log("Error in fetching posts",error);
    } 
  }

  useEffect(()=> {
    getPost();
  }, []);

  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts.map((post)=>(
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </ul>  
    </>
  );
}

// Counter App Example
// function Home() {
//   const [count, setCount] = useState(0);
//   return (
//     <>
//     <h1>Counter App</h1>
//     <h2>Count: {count}</h2>
//     <button onClick={()=>setCount(count+1)}>Increment</button>
//     <button onClick={()=>setCount(count-1)}>Decrement</button>
//     <button onClick={()=>setCount(0)}>Reset</button>

//     </>
//   );
// }
 
export default Home;
