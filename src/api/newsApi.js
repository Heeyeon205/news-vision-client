import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/news';

export const fetchNewsList = async () => {
  const response = await axios.get(`${BASE_URL}/main`);
  return response.data.data;
}