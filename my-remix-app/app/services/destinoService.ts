import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
});

export const getDestinity = async (endpoint: string) => {
  try {
    const response = await axiosClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error en getDestinity:', error);
    throw error;
  }
};

export const sendDestinity = async (endpoint: string, data: any) => {
  try {
    const response = await axiosClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error en sendDestinity:', error);
    throw error;
  }
};
