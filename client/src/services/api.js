import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export const getGlucoseReading = async () => {
  return await axios.get(`${API_URL}/glucose`);
};

export const getGlucoseData = async () => {
  return await axios.get(`${API_URL}/glucose-data`);
};

export const saveToCSV = async () => {
  return await axios.post(`${API_URL}/save-csv`);
};

export const saveToExcel = async () => {
  return await axios.post(`${API_URL}/save-excel`);
};
