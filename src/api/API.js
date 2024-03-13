import axios from "axios";

export const api = axios.create({
  baseURL: "http://regymatrix-001-site1.ktempurl.com/api/Logs",
  auth: {
    username: "11164448",
    password: "60-dayfreetrial",
  },
});
