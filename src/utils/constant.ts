const API_BASE_URL = `${
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/v1"
    : "https://mern-job-server.onrender.com/api/v1"
}`;

export const USER_API_END_POINT = `${API_BASE_URL}/users`;
export const JOB_API_END_POINT = `${API_BASE_URL}/jobs`;
export const APPLICATION_API_END_POINT = `${API_BASE_URL}/applications`;
export const COMPANY_API_END_POINT = `${API_BASE_URL}/companies`;

export const NAVLINKS = [
  { label: "Home", path: "/" },
  { label: "Jobs", path: "/jobs" },
  { label: "Browse", path: "/browse" },
];
