import React from 'react';
import { Select } from '@chakra-ui/react';

const RegionSelector = ({ selectedRegion, onRegionChange }) => {
  const regionOptions = [
    { value: 'na1', label: 'North America' },
    { value: 'euw1', label: 'Europe West' },
    { value: 'eun1', label: 'Europe East' },
  ];

  return (
    <Select value={selectedRegion} onChange={onRegionChange} mb={4}>
      {regionOptions.map((region) => (
        <option key={region.value} value={region.value}>
          {region.label}
        </option>
      ))}
    </Select>
  );
};

export default RegionSelector;
