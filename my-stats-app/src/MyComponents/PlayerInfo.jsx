import React from 'react';
import { VStack, Heading, Image, Text } from '@chakra-ui/react';

const PlayerInfo = ({ playerData }) => (
  <VStack spacing={4} mt={4}>
    <Heading>{playerData.name}</Heading>
    <Image
      boxSize="100px"
      objectFit="cover"
      src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${playerData.profileIconId}.png`}
      alt="Profile Icon"
    />
    <Text>Summoner level {playerData.summonerLevel}</Text>
  </VStack>
);

export default PlayerInfo;
