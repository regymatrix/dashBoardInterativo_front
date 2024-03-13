import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7291/api/Logs",
});
