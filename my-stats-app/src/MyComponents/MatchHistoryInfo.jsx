import React from "react";
import { VStack, Heading, Box, Text } from "@chakra-ui/react";

const MatchHistoryInfo = ({ matchHistory }) => (
  <VStack spacing={4} mt={4} textAlign="center">
    <Heading size="md">Match History</Heading>
    {matchHistory && matchHistory.matches && matchHistory.matches.length > 0 ? (
      matchHistory.matches.map((match, index) => (
        <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
          <Text>Champion ID: {match.champion}</Text>
          <Text>Game Mode: {match.queue}</Text>
          {/* Add more details as needed */}
        </Box>
      ))
    ) : (
      <Text>No match history available</Text>
    )}
  </VStack>
);

export default MatchHistoryInfo;
