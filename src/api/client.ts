import axios from "axios";

const baseURL = 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL,
  // ...
});