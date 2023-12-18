//Fix three new functions. DOesnt display data because wrong api
import React, { useState } from "react";
import axios from "axios";
import {
  ChakraProvider,
  Box,
  VStack,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import SearchForm from "./MyComponents/SearchForm";
import PlayerInfo from "./MyComponents/PlayerInfo";
import RankedInfo from "./MyComponents/RankedInfo";
import ErrorMessage from "./MyComponents/ErrorMessage";
import RegionSelector from "./MyComponents/RegionSelector";
import theme from "./chakra-theme";
import MatchDetailsInfo from "./MyComponents/MatchDetailsInfo";
import MatchHistoryInfo from "./MyComponents/MatchHistoryInfo";
import ChampionMasteryInfo from "./MyComponents/ChampionMasteryInfo";

const App = () => {
  const [playerData, setPlayerData] = useState({});
  const [rankedData, setRankedData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("na1"); // Default region: NA
  const [matchHistoryData, setMatchHistoryData] = useState([]);
  const [matchDetailsData, setmatchDetailsData] = useState([]);
  const [championMasteryData, setchampionMasteryData] = useState([]);

  const API_KEY = "RGAPI-392c8e52-e748-4f53-ab8f-65e10f82ecce"; // Add your Riot Games API key here

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

    axios.get(summonerAPI).then((response) => {
      setPlayerData(response.data);

      // Use Promise.all to wait for all promises to resolve
      Promise.all([
        fetchRankedInformation(response.data.id),
        fetchMatchHistory(response.data.accountId),
        fetchMatchDetails(response.data.recentMatchId),
        fetchChampionMastery(response.data.id),
      ])
        .then(([rankedInfo, matchHistory, matchDetails, championMastery]) => {
          setRankedData(rankedInfo);
          setMatchHistoryData(matchHistory);
          setmatchDetailsData(matchDetails);
          setchampionMasteryData(championMastery);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
  };

  const fetchRankedInformation = (summonerId) => {
    const rankedAPI = `https://${selectedRegion}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`;

    axios
      .get(rankedAPI)
      .then((response) => {
        setRankedData(response.data);
      })
      .catch((error) => {
        setRankedData([]);
        console.error("Error fetching ranked information:", error);
      });
  };

  const fetchMatchHistory = (puuid) => {
    const matchHistoryAPI = `https://${selectedRegion}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${API_KEY}`;

    return axios
      .get(matchHistoryAPI)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching match history:", error);
        console.log(response.data);
        throw error;
      });
  };

  const fetchMatchDetails = (matchId) => {
    const matchDetailsAPI = `https://${selectedRegion}.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${API_KEY}`;

    return axios
      .get(matchDetailsAPI)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching match details:", error);
        throw error;
      });
  };

  const fetchChampionMastery = (summonerId) => {
    const championMasteryAPI = `https://${selectedRegion}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${API_KEY}`;

    return axios
      .get(championMasteryAPI)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching champion mastery:", error);
        throw error;
      });
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box maxW="1280px" m="0 auto" p="2rem" textAlign="center" bg="brand.50">
        <RegionSelector
          selectedRegion={selectedRegion}
          onRegionChange={handleRegionChange}
        />
        <SearchForm onSearch={searchForPlayer} />
        {error && <ErrorMessage error={error} />}
        {Object.keys(playerData).length !== 0 && (
          <PlayerInfo playerData={playerData} />
        )}

        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>three</Tab>
            <Tab>Four</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {rankedData.length !== 0 && (
                <RankedInfo rankedData={rankedData} />
              )}
            </TabPanel>
            <TabPanel>
              <MatchHistoryInfo matchHistory={matchHistoryData} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ChakraProvider>
  );
};

export default App;
