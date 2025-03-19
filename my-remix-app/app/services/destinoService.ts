const baseURL = 'http://localhost:5260/api/';

export async function get (endpoint: string) {
  try {
    const response = await fetch(
        baseURL + endpoint,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
    return response;
  } catch (error) {
    console.error('Error en getDestinity:', error);
    throw error;
  }
};

export const post = async (endpoint: string, data: any) => {
  try {
    const response = await fetch(
        baseURL + endpoint, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
    return response;
  } catch (error) {
    console.error('Error en sendDestinity:', error);
    throw error;
  }
};