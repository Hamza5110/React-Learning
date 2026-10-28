import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import Card from "./Card";
import { getAllBlogs } from "../api/blogApi";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getAllBlogs();
        setBlogs(data.blogs || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Latest Blogs</h2>
            <Link
              to="/blogs/new"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            >
              Create Blog
            </Link>
          </div>

          {loading && (
            <p className="text-center text-gray-500">Loading blogs...</p>
          )}
          {error && (
            <p className="text-center text-red-500 mb-4">{error}</p>
          )}
          {!loading && !error && blogs.length === 0 && (
            <p className="text-center text-gray-500">
              No blogs yet.{" "}
              <Link to="/blogs/new" className="text-blue-600 hover:underline">
                Create the first one
              </Link>
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Card
                key={blog._id}
                id={blog._id}
                title={blog.title}
                body={blog.content}
                author={blog.author}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
