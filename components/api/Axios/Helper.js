// apiService.js
'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
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
export const insertData = async (endpoint, data, flag) => {
  try {
    //const router = useRouter();
    let header;
    if(flag){
      const token = localStorage.getItem('token');
      if(!token){
        router.push('/');
      }
      header = { headers: { "Content-Type": "application/json", "Authorization":  `Bearer ${token}` }};
    } else{
      header = { headers: { "Content-Type": "application/json" }};
    }
    const response = await axios.post(`${API_URL}/${endpoint}`, data, header);
    return response.data; // Return the created data
  } catch (error) {
    if(error.status === 401){
      localStorage.clear();
      window.location.href = '/'; 
    }
    console.error('Error inserting data:', error);
    throw error; // Re-throw the error for further handling
  }
};

export const insertImageData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/images/upload/single`, data, {
			headers: {
			"Content-Type": "multipart/form-data",
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
export const updateData = async (endpoint, data, flag) => {
  try {
    let header;

    if (flag) {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        // Redirect to login if token is missing
        window.location.href = '/';
        return false;
      }
      header = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      };
    } else {
      // No token required
      header = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    // Send the PUT request with the appropriate headers
    const response = await axios.put(`${API_URL}/${endpoint}`, data, header);
    return response.data; // Return the updated data
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      localStorage.clear();
      window.location.href = '/';
    }
    console.error('Error updating data:', error);
    throw error; // Re-throw for further error handling
  }
};


// Function to handle DELETE requests
export const deletedData = async (endpoint, data) => {
  try {
    const token = localStorage.getItem('token');
    console.log(token);
    if(!token){
      router.push('/');
      window.location.href = '/';
      return false;
    }

    const options = {
      method: 'DELETE',
      url: `${API_URL}/${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json'
      }
    };

    const { data } = await axios.request(options);
    console.log(data);
    return data; // Return the created data
  } catch (error) {
    console.error('Error delete data:', error);
    if(error.status === 401){
      localStorage.clear();
      window.location.href = '/'; 
    }
    throw error; // Re-throw the error for further handling
  }
};

export const deletedRecord = async (endpoint, data) => {
  try {
    const token = localStorage.getItem('token');
    if(!token){
      router.push('/');
    }
    console.log(token);
    const response = await axios.delete(`${API_URL}/api/projects/38cd3335-f837-472e-ab07-f8efb6632331`, data, {
			headers: { "Content-Type": "application/json", "Authorization":  `Bearer ${token}` },
		});
    console.log(response);
    return response.data; // Return the created data
  } catch (error) {
    if(error.response.status === 401){
      localStorage.clear();
      router.push('/');
    }else{
      console.error('Error delete data:', error);
      throw error; // Re-throw the error for further handling
    }
  }
};

