// apiService.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Replace with your base API URL

// Function to handle GET requests
export const getData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error for further handling
  }
};

// Function to handle POST requests
export const insertData = async (endpoint, data) => {
  console.log(API_URL);
  console.log(`${API_URL}/${endpoint}`);
  console.log(data);  
  try {
    const response = await axios.post(`${API_URL}/${endpoint}`, data, {
			headers: {
			"Content-Type": "application/json",
			},
		});
    console.log(response);
    return response.data; // Return the created data
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error; // Re-throw the error for further handling
  }
};
export const createUser = async (userData) => {
  const endpoint = 'users'; // Example API endpoint for creating a user
  try {
    const result = await insertData(endpoint, userData);
    console.log('User created successfully:', result);
    return result; // Return the result if needed
  } catch (error) {
    return false;
  }
};

// Function to handle PUT requests (for updates)
export const updateData = async (endpoint, data) => {
  try {
    const response = await axios.put(`${API_URL}/${endpoint}`, data);
    return response.data; // Return the updated data
  } catch (error) {
    console.error('Error updating data:', error);
    return false; // Re-throw the error for further handling
  }
};

// Function to handle DELETE requests
export const deleteData = async (endpoint) => {
  try {
    const response = await axios.delete(`${API_URL}/${endpoint}`);
    return response.data; // Return a success message or the deleted data
  } catch (error) {
    console.error('Error deleting data:', error);
    return false; // Re-throw the error for further handling
  }
};
