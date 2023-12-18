import React from "react";
import { VStack, Heading, Box, Text } from "@chakra-ui/react";

const MatchDetailsInfo = ({ matchDetails }) => (
  <VStack spacing={4} mt={4} textAlign="center">
    <Heading size="md">Match Details</Heading>
    {/* Extract relevant details from matchDetails and display */}
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      {/* Example: <Text>Game Duration: {matchDetails.gameDuration}</Text> */}
    </Box>
  </VStack>
);

export default MatchDetailsInfo;
