const API_BASE = "http://localhost:5000/api/blog";

async function handleResponse(res) {
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export async function getAllBlogs() {
  const res = await fetch(`${API_BASE}/all`);
  return handleResponse(res);
}

export async function getBlogById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  return handleResponse(res);
}

export async function createBlog(payload) {
  const res = await fetch(`${API_BASE}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function updateBlog(id, payload) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deleteBlog(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  return handleResponse(res);
}
