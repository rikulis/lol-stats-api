import React, { useState } from 'react';
import { VStack, Input, Button } from '@chakra-ui/react';

const SearchForm = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchText);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <Input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Summoner Name"
        />
        <Button type="submit">Search</Button>
      </VStack>
    </form>
  );
};

export default SearchForm;
