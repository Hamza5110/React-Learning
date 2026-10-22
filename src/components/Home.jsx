import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import Card from "./Card";

/// API Example
function Home() {
  const [posts, setPosts] = useState([]);

  const getPost = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log("Error in fetching posts", error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <section className="py-4 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl text-center font-blod mb-8">Latest Blogs</h2>
          <div className="grid grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} title={post.title} body={post.body} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
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
