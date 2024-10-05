import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";

// Calculate the number of attempts
export function attemptsNumber(result) {
  return result.filter((r) => r !== undefined).length;
}

//  Calculate the earned points
export function earnPointsNumber(result, answers, point) {
  return result.reduce((total, current, index) => {
    return answers[index] === current ? total + point : total;
  }, 0);
}

// Determine if the result is flagged as "Passed"
export function flagResult(totalPoints, earnPoints) {
  return earnPoints >= totalPoints * 0.5; // Earn at least 50% of total points
}

// Check user authentication
export function CheckUserExist({ children }) {
  const auth = useSelector((state) => state.result.userId);
  return auth ? children : <Navigate to="/" replace />;
}

// Get data from the server
export async function getServerData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}

// Post data to the server
export async function postServerData(url, data) {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Failed to post data:", error);
    throw error;
  }
}
