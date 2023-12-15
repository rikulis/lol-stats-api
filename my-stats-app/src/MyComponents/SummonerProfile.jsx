// SummonerProfile.js
import React, { useState, useEffect } from 'react';
import { getSummonerData } from './api';

const SummonerProfile = () => {
  const [summonerData, setSummonerData] = useState(null);
  const summonerName = 'master of switne'; // Replace with the actual summoner name

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSummonerData(summonerName);
        setSummonerData(data);
      } catch (error) {
        console.error('Error fetching summoner data:', error);
      }
    };

    fetchData();
  }, [summonerName]);

  return (
    <div>
      {summonerData ? (
        <div>
          <h2>{summonerData.name}'s Profile</h2>
          <p>Level: {summonerData.level}</p>
          {/* Add more information as needed */}
        </div>
      ) : (
        <p>Loading summoner data...</p>
      )}
    </div>
  );
};

export default SummonerProfile;
