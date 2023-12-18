import React from "react";
import { VStack, Heading, Box, Text } from "@chakra-ui/react";

const ChampionMasteryInfo = ({ championMastery }) => (
  <VStack spacing={4} mt={4} textAlign="center">
    <Heading size="md">Champion Mastery</Heading>
    {championMastery.map((mastery, index) => (
      <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
        <Text>Champion ID: {mastery.championId}</Text>
        <Text>Mastery Level: {mastery.championLevel}</Text>
        <Text>Mastery Points: {mastery.championPoints}</Text>
        {/* Add more details as needed */}
      </Box>
    ))}
  </VStack>
);

export default ChampionMasteryInfo;
