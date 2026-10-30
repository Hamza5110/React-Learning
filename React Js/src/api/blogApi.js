const API_BASE = "http://localhost:5000/api";

function authHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

async function handleResponse(res) {
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export async function signup(payload) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function login(payload) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function getAllBlogs() {
  const res = await fetch(`${API_BASE}/blog/all`, { headers: authHeaders() });
  return handleResponse(res);
}

export async function getBlogById(id) {
  const res = await fetch(`${API_BASE}/blog/${id}`, { headers: authHeaders() });
  return handleResponse(res);
}

export async function createBlog(payload) {
  const res = await fetch(`${API_BASE}/blog/create`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function updateBlog(id, payload) {
  const res = await fetch(`${API_BASE}/blog/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deleteBlog(id) {
  const res = await fetch(`${API_BASE}/blog/${id}`, { method: "DELETE", headers: authHeaders() });
  return handleResponse(res);
}

export async function getAllCourses() {
  const res = await fetch(`${API_BASE}/course`, { headers: authHeaders() });
  return handleResponse(res);
}

export async function getMyCourses() {
  const res = await fetch(`${API_BASE}/course/my`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function getCourseBySlug(slug) {
  const res = await fetch(`${API_BASE}/course/${slug}`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function createCourse(payload) {
  const res = await fetch(`${API_BASE}/course`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function updateCourse(slug, payload) {
  const res = await fetch(`${API_BASE}/course/${slug}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deleteCourse(slug) {
  const res = await fetch(`${API_BASE}/course/${slug}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function enrollInCourse(slug) {
  const res = await fetch(`${API_BASE}/course/${slug}/enroll`, {
    method: "POST",
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function unenrollFromCourse(slug) {
  const res = await fetch(`${API_BASE}/course/${slug}/unenroll`, {
    method: "POST",
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function getUser(id) {
  const res = await fetch(`${API_BASE}/user/${id}`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function getAllUsers() {
  const res = await fetch(`${API_BASE}/user`, { headers: authHeaders() });
  return handleResponse(res);
}

export async function updateUser(id, payload) {
  const res = await fetch(`${API_BASE}/user/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deleteUser(id) {
  const res = await fetch(`${API_BASE}/user/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse(res);
}