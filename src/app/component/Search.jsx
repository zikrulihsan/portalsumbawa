// SearchComponent.js
import React, { useRef, useState } from 'react';
import { Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { FaCross, FaRemoveFormat, FaSearchLocation, FaWindowClose } from 'react-icons/fa';

const SearchComponent = ({ onSearch }) => {
  const inputRef = useRef(null)

  const [querySearch, setQuerySearch] = useState("")

  const handleSearch = query => {
    setQuerySearch(query)
    onSearch(query);
  };

  const handleInputFocus = () => {
    // Scroll to the input element when it gains focus
    inputRef.current.scrollIntoView({ behavior: 'smooth'});
  };

  return (
    <InputGroup >
      <Input
        ref={inputRef}
        type="text"
        placeholder="Cari Sate Ayam, Es kristal, kurir, dll"
        onFocus={handleInputFocus}
        value={querySearch}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <InputRightElement>
        <IconButton
          aria-label="Search"
          icon={ querySearch == "" ? <FaSearchLocation /> : <FaWindowClose/>}
          onClick={() => handleSearch("")}
          variant="outline"
        />
        
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchComponent;
