// api.js
import axios from 'axios';

const API_KEY = ""; // Replace with your actual API key
const BASE_URL = 'https://platform_id.api.riotgames.com'; // Replace with the actual League of Legends API base URL

export const getSummonerData = async (summonerName) => {
  try {
    const response = await axios.get(`${BASE_URL}/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add more functions for different API endpoints as needed
