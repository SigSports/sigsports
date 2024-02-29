import axios from "axios";

export const apiSuap = axios.create({
  baseURL: "https://suap.ifrn.edu.br/api/v2/",
});

export const api = axios.create({
  baseURL: "http://40.76.188.129:8008/api/",
});
