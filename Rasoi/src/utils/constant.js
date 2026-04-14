// export const BASE_URL="https://rasoi-app-1.onrender.com"

export const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://rasoi-app-1.onrender.com";