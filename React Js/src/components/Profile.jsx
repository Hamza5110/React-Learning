import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";
import { getUser, updateUser } from "../api/blogApi";

function Profile() {
  const { user, updateUser: updateAuthUser } = useAuth();
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      try {
        const data = await getUser(user.id);
        const next = data.user;
        setForm({
          username: next.username || "",
          email: next.email || "",
        });
        updateAuthUser({
          id: next.id,
          username: next.username,
          email: next.email,
          role: next.role,
        });
      } catch (err) {
        setError(err.message);
        setForm({
          username: user.username || "",
          email: user.email || "",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return;

    setSaving(true);
    setError("");
    setMessage("");
    try {
      const data = await updateUser(user.id, {
        username: form.username.trim(),
        email: form.email.trim(),
      });
      updateAuthUser(data.user);
      setMessage(data.message || "Profile updated successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const initials = (user?.username || user?.email || "U")
    .slice(0, 1)
    .toUpperCase();

  return (
    <>
      <Navbar />
      <section className="min-h-[70vh] bg-gray-100 py-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Profile</h1>
            <Link to="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg mb-6 flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-semibold">
              {initials}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {user?.username || "User"}
              </p>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <span className="mt-1 inline-block text-xs capitalize bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                {user?.role || "student"}
              </span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Edit details</h2>

            {loading && <p className="text-gray-500 mb-3">Loading profile...</p>}
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            {message && <p className="text-green-600 text-sm mb-3">{message}</p>}

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              type="text"
              className="w-full border p-2 rounded mb-4"
              required
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              className="w-full border p-2 rounded mb-4"
              required
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <input
              value={user?.role || "student"}
              type="text"
              className="w-full border p-2 rounded mb-4 bg-gray-50 capitalize"
              disabled
            />

            <button
              type="submit"
              disabled={saving || loading}
              className="bg-blue-500 text-white rounded-md px-4 w-full py-2 hover:bg-blue-600 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
