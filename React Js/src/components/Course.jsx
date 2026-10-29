import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";
import { getAllCourses } from "../api/blogApi";

function Course() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const canCreate =
    user?.role === "instructor" || user?.role === "admin";

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getAllCourses();
        setCourses(data.courses || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  return (
    <>
      <Navbar />
      <section className="min-h-[70vh] bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Courses</h1>
            {canCreate && (
              <Link
                to="/courses/new"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                Create Course
              </Link>
            )}
          </div>

          {loading && (
            <p className="text-center text-gray-500">Loading courses...</p>
          )}
          {error && <p className="text-center text-red-500 mb-4">{error}</p>}
          {!loading && !error && courses.length === 0 && (
            <p className="text-center text-gray-500">
              No courses yet.
              {canCreate && (
                <>
                  {" "}
                  <Link
                    to="/courses/new"
                    className="text-blue-600 hover:underline"
                  >
                    Create the first one
                  </Link>
                </>
              )}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const instructorName =
                course.instructor?.username ||
                course.instructor?.email ||
                "Unknown";
              const preview =
                course.description?.length > 100
                  ? `${course.description.slice(0, 100)}...`
                  : course.description;

              return (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200 overflow-hidden flex flex-col"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 object-cover bg-gray-200"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x240?text=Course";
                    }}
                  />
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                      {course.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">
                      By {instructorName}
                    </p>
                    <p className="text-gray-600 mb-4 flex-1">{preview}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-blue-600">
                        ${course.price}
                      </span>
                      <Link
                        to={`/courses/${course.slug}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Course;
