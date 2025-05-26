const API_URL = "http://localhost:3000/";
import axios from "axios";
import { User } from "@/models/user";
import { UserActivity } from "@/models/userActivity";
import { UserAverageSessions } from "@/models/userAverageSessions";
import { UserPerformance } from "@/models/userPerformance";

const USE_MOCKED_DATA = false;

export const getUser = async (id, useMockedData = USE_MOCKED_DATA) => {
  if (useMockedData) {
    // ---------- Mocked Data
    const responseMocked = await fetch("/data/data.json");
    const dataMock = await responseMocked.json();
    const dataMocked = dataMock.USER_MAIN_DATA.find(
      (user) => user.id === parseInt(id)
    );
    const userModel = new User(dataMocked);
    return userModel.toJSON();
  } else {
    // ---------- API Call
    const response = await axios.get(`${API_URL}user/${id}`);
    const data = response.data;
    const userModel = new User(data.data);
    return userModel.toJSON();
  }
};

export const getUserActivity = async (id, useMockedData = USE_MOCKED_DATA) => {
  if (useMockedData) {
    // ---------- Mocked Data
    const responseMocked = await fetch("/data/data.json");
    const dataMock = await responseMocked.json();
    const dataMocked = dataMock.USER_ACTIVITY.find(
      (user) => user.userId === parseInt(id)
    );
    const userActivityModel = new UserActivity(dataMocked);
    return userActivityModel.toJSON();
  } else {
    // ---------- API Call
    const response = await axios.get(`${API_URL}user/${id}/activity`);
    const userActivity = response.data.data;
    const userActivityModel = new UserActivity(userActivity);
    return userActivityModel.toJSON();
  }
};

export const getUserAverageSessions = async (
  id,
  useMockedData = USE_MOCKED_DATA
) => {
  if (useMockedData) {
    // ---------- Mocked Data
    const responseMocked = await fetch("/data/data.json");
    const dataMock = await responseMocked.json();
    const dataMocked = dataMock.USER_AVERAGE_SESSIONS.find(
      (user) => user.userId === parseInt(id)
    );
    const userAverageSessionsModel = new UserAverageSessions(dataMocked);
    return userAverageSessionsModel.toJSON();
  } else {
    // ---------- API Call
    const response = await axios.get(`${API_URL}user/${id}/average-sessions`);
    const userAverageSessions = response.data.data;
    const userAverageSessionsModel = new UserAverageSessions(
      userAverageSessions
    );
    return userAverageSessionsModel.toJSON();
  }
};

export const getUserPerformance = async (
  id,
  useMockedData = USE_MOCKED_DATA
) => {
  if (useMockedData) {
    // ---------- Mocked Data
    const responseMocked = await fetch("/data/data.json");
    const dataMock = await responseMocked.json();
    const dataMocked = dataMock.USER_PERFORMANCE.find(
      (user) => user.userId === parseInt(id)
    );
    const userPerformanceModel = new UserPerformance(dataMocked);
    return userPerformanceModel.toJSON();
  } else {
    // ---------- API Call
    const response = await axios.get(`${API_URL}user/${id}/performance`);
    const userPerformance = await response.data.data;
    const userPerformanceModel = new UserPerformance(userPerformance);
    return userPerformanceModel.toJSON();
  }
};
