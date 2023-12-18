import React, { useState } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  VStack,
  Select,
} from '@chakra-ui/react';

import SearchForm from './MyComponents/SearchForm';
import PlayerInfo from './MyComponents/PlayerInfo';
import RankedInfo from './MyComponents/RankedInfo';
import ErrorMessage from './MyComponents/ErrorMessage';
import RegionSelector from './MyComponents/RegionSelector';
import theme from './chakra-theme';

const App = () => {
  const [playerData, setPlayerData] = useState({});
  const [rankedData, setRankedData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('na1'); // Default region: NA

  const API_KEY = "RGAPI-88dfe350-eeed-4c34-9953-8c351c56e005"; // Add your Riot Games API key here

  const searchForPlayer = (searchText) => {
    if (!API_KEY) {
      setError("API key is missing. Please add your Riot Games API key.");
      return;
    }

    // Reset previous data
    setPlayerData({});
    setRankedData([]);
    setError(null);

    const summonerAPI = `https://${selectedRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchText}?api_key=${API_KEY}`;

    axios.get(summonerAPI)
      .then((response) => {
        setPlayerData(response.data);
        // Fetch ranked information after retrieving summoner data
        fetchRankedInformation(response.data.id);
      })
      .catch((error) => {
        setPlayerData({});
        setError("Player not found or an error occurred. Please try again.");
        console.error(error);
      });
  };

  const fetchRankedInformation = (summonerId) => {
    const rankedAPI = `https://${selectedRegion}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`;

    axios.get(rankedAPI)
      .then((response) => {
        setRankedData(response.data);
      })
      .catch((error) => {
        setRankedData([]);
        console.error("Error fetching ranked information:", error);
      });
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  return (
    <ChakraProvider theme={theme}> 
      <Box maxW="1280px" m="0 auto" p="2rem" textAlign="center" bg="brand.50">
      <RegionSelector selectedRegion={selectedRegion} onRegionChange={handleRegionChange} />
        <SearchForm onSearch={searchForPlayer} />
        {error && <ErrorMessage error={error} />}
        {Object.keys(playerData).length !== 0 && <PlayerInfo playerData={playerData} />}
        {rankedData.length !== 0 && <RankedInfo rankedData={rankedData} />}
      </Box>
    </ChakraProvider>
  );
};

export default App;
