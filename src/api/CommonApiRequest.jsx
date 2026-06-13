const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiRequest = async ({
  endpoint,
  method = "GET",
  body = null,
  headers = {},
}) => {
  const token = localStorage.getItem("token");
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  // add token only if present
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // add body only if present
  if (body) {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, config);

  // Token rejected by backend (expired or tampered)
  if (res.status === 401) {
    localStorage.clear();
    window.location.href = "/";
    return;
  }

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
};
