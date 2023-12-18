import React from 'react';
import { VStack, Heading, Box, Text } from '@chakra-ui/react';

const RankedInfo = ({ rankedData }) => (
  <VStack spacing={4} mt={4} textAlign="center">
    <Heading size="md">Ranked Information</Heading>
    {rankedData.map((entry, index) => (
      <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
        <Text>{entry.queueType}</Text>
        <Text>Tier: {entry.tier}</Text>
        <Text>Rank: {entry.rank}</Text>
        <Text>League Points: {entry.leaguePoints}</Text>
        <Text>Wins: {entry.wins}</Text>
        <Text>Losses: {entry.losses}</Text>
      </Box>
    ))}
  </VStack>
);

export default RankedInfo;
