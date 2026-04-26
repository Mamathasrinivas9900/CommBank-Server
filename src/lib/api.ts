import axios from "axios";

const API_URL = "http://localhost:5000/goals";

// GET all goals
export const getGoals = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ADD goal
export const addGoal = async (goal: any) => {
  const response = await axios.post(API_URL, goal);
  return response.data;
};

// UPDATE goal (PUT) ⭐
export const updateGoal = async (id: string, updatedGoal: any) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedGoal);
  return response.data;
};