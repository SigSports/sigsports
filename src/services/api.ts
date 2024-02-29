import axios from "axios";

export const apiSuap = axios.create({
  baseURL: "https://suap.ifrn.edu.br/api/v2/",
});

export const api = axios.create({
  baseURL: "https://sigsport.pythonanywhere.com/api/",
});
