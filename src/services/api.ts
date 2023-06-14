import axios from "axios";

export const api = axios.create({
  baseURL: "https://suap.ifrn.edu.br/api/v2/",
});
