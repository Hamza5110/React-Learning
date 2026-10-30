import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";
import { deleteUser, getAllUsers } from "../api/blogApi";

function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllUsers();
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      loadUsers();
    }
  }, [user?.role]);

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const handleDelete = async (target) => {
    const id = target._id || target.id;
    if (!id) return;
    if (String(id) === String(user.id)) {
      setError("You cannot delete your own account");
      return;
    }

    const confirmed = window.confirm(
      `Delete user "${target.username || target.email}" permanently?`,
    );
    if (!confirmed) return;

    setDeletingId(id);
    setError("");
    setMessage("");
    try {
      const data = await deleteUser(id);
      setUsers((prev) =>
        prev.filter((u) => String(u._id || u.id) !== String(id)),
      );
      setMessage(data.message || "User deleted successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-[70vh] bg-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Admin · Users</h1>
            <Link to="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {message && <p className="text-green-600 mb-4">{message}</p>}
          {loading && <p className="text-gray-500">Loading users...</p>}

          {!loading && users.length === 0 && !error && (
            <p className="text-gray-500">No users found.</p>
          )}

          {!loading && users.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
              <table className="w-full text-left min-w-[560px]">
                <thead className="border-b border-gray-100 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                      Username
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                      Role
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((row) => {
                    const id = row._id || row.id;
                    const isSelf = String(id) === String(user.id);
                    return (
                      <tr
                        key={id}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {row.username}
                          {isSelf && (
                            <span className="ml-2 text-xs text-gray-400">
                              (you)
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {row.email}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block text-xs capitalize bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                            {row.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => handleDelete(row)}
                            disabled={isSelf || deletingId === id}
                            className="text-sm text-red-600 hover:text-red-700 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            {deletingId === id ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default AdminUsers;
