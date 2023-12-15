import React, { useState } from 'react';
//import SummonerProfile from './SummonerProfile';
import axios from 'axios';
const App = () => {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const API_KEY = "";

  function searchForPlayer(event) {
    var APICallString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + searchText + "?api_key=" + API_KEY;
    axios.get(APICallString).then(function (response) {
      setPlayerData(response.data);
    }).catch(function (error) {
      console.log(error)
    });
  }
  console.log(playerData)
  return (
    <div>
      <input type="text" onChange={e => setSearchText(e.target.value)}></input>
     <button onClick={e => searchForPlayer(e)}>Search</button>
     {JSON.stringify(playerData) != '{}' ? 
     <>
     <p>{playerData.name}</p>
     <img width="100" height="100" src={'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/' + playerData.profileIconId + '.png'}></img>
     <p>Summoner level {playerData.summonerLevel}</p>
     </>
      : 
      <><p>No player data</p></>}
    </div>
  );
};

export default App;