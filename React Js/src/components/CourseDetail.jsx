import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";
import {
  deleteCourse,
  enrollInCourse,
  getCourseBySlug,
  unenrollFromCourse,
  updateCourse,
} from "../api/blogApi";

function isSameId(a, b) {
  if (!a || !b) return false;
  const left = typeof a === "object" ? a._id || a.id : a;
  const right = typeof b === "object" ? b._id || b.id : b;
  return String(left) === String(right);
}

function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const isStudent = user?.role === "student";
  const isAdmin = user?.role === "admin";
  const isOwner =
    course &&
    (isSameId(course.instructor, user?.id) ||
      isSameId(course.instructor?._id, user?.id));
  const canManage = isAdmin || (user?.role === "instructor" && isOwner);
  const enrolled =
    course?.students?.some((studentId) => isSameId(studentId, user?.id)) ||
    false;

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getCourseBySlug(slug);
        setCourse(data.course);
        setForm({
          title: data.course.title,
          description: data.course.description,
          price: String(data.course.price),
          image: data.course.image,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [slug]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const data = await updateCourse(slug, {
        title: form.title.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        image: form.image.trim(),
      });
      setCourse(data.course);
      setEditing(false);
      setMessage("Course updated");
      if (data.course.slug !== slug) {
        navigate(`/courses/${data.course.slug}`, { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this course permanently?");
    if (!confirmed) return;

    setSaving(true);
    setError("");
    try {
      await deleteCourse(slug);
      navigate("/courses");
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const handleEnroll = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const data = await enrollInCourse(slug);
      setCourse(data.course);
      setMessage(data.message || "Enrolled successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUnenroll = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const data = await unenrollFromCourse(slug);
      setCourse(data.course);
      setMessage(data.message || "Unenrolled successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const instructorName =
    course?.instructor?.username ||
    course?.instructor?.email ||
    (typeof course?.instructor === "string" ? "Instructor" : "Unknown");

  return (
    <>
      <Navbar />
      <section className="min-h-[70vh] bg-gray-100 py-10">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            to="/courses"
            className="text-blue-600 hover:underline mb-6 inline-block"
          >
            &larr; Back to Courses
          </Link>

          {loading && <p className="text-gray-500">Loading course...</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {message && <p className="text-green-600 mb-4">{message}</p>}

          {!loading && course && !editing && (
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-56 object-cover bg-gray-200"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/800x320?text=Course";
                }}
              />
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h1>
                <p className="text-sm text-gray-500 mb-2">
                  By {instructorName}
                  {course.createdAt &&
                    ` · ${new Date(course.createdAt).toLocaleDateString()}`}
                </p>
                <p className="text-2xl font-semibold text-blue-600 mb-4">
                  ${course.price}
                </p>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-4">
                  {course.description}
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  {course.students?.length || 0} student
                  {(course.students?.length || 0) === 1 ? "" : "s"} enrolled
                </p>

                <div className="flex flex-wrap gap-3">
                  {isStudent && !enrolled && (
                    <button
                      type="button"
                      onClick={handleEnroll}
                      disabled={saving}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
                    >
                      {saving ? "Enrolling..." : "Enroll"}
                    </button>
                  )}
                  {isStudent && enrolled && (
                    <button
                      type="button"
                      onClick={handleUnenroll}
                      disabled={saving}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
                    >
                      {saving ? "Updating..." : "Unenroll"}
                    </button>
                  )}
                  {canManage && (
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={saving}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </article>
          )}

          {!loading && course && editing && (
            <form
              onSubmit={handleUpdate}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4">Edit Course</h2>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-4"
                required
              />

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={8}
                className="w-full border p-2 rounded mb-4 resize-y"
                required
              />

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                type="number"
                min="0"
                step="0.01"
                className="w-full border p-2 rounded mb-4"
                required
              />

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                type="url"
                className="w-full border p-2 rounded mb-4"
                required
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setForm({
                      title: course.title,
                      description: course.description,
                      price: String(course.price),
                      image: course.image,
                    });
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default CourseDetail;
