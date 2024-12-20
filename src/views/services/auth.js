import axios from 'axios';

export async function refreshToken() {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post('http://localhost:3000/auth/refresh', { token: refreshToken });
    localStorage.setItem('accessToken', response.data.access_token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    return response.data.access_token;
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw error;
  }
}
