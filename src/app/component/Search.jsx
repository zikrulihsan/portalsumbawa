// SearchComponent.js
import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { FaSearchLocation } from 'react-icons/fa';

const SearchComponent = ({ onSearch }) => {
  // const [query, setQuery] = useState('');

  const handleSearch = query => {
    // You can perform search-related actions here
    onSearch(query);
  };

  return (
    <InputGroup >
      <Input
        type="text"
        placeholder="Cari Sate Ayam, Es kristal, kurir, dll"
       
        onChange={(e) => handleSearch(e.target.value)}
      />
      <InputRightElement>
        <IconButton
          aria-label="Search"
          icon={<FaSearchLocation />}
          onClick={handleSearch}
          variant="outline"
        />
        
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchComponent;
