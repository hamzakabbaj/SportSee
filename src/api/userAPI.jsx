const API_URL = "http://localhost:3000/";

import axios from "axios";

export const getUser = async (id) => {
  const response = await axios.get(`${API_URL}user/${id}`);
  return response.data;
};

export const getUserActivity = async (id) => {
  const response = await axios.get(`${API_URL}user/${id}/activity`);
  return response.data;
};

export const getUserAverageSessions = async (id) => {
  const response = await axios.get(`${API_URL}user/${id}/average-sessions`);
  return response.data;
};

export const getUserPerformance = async (id) => {
  const response = await axios.get(`${API_URL}user/${id}/performance`);
  return response.data;
};
