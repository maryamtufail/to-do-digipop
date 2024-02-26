import axios from 'axios';

const API_URL = 'https://dummyjson.com/todos';

export const fetchTodosFromApi = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos from API:', error);
    throw error;
  }
};
