// SearchComponent.js
import React, { useRef, useState } from 'react';
import { Text, Box, Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { FaCheck, FaCross, FaRemoveFormat, FaSearchLocation, FaWindowClose } from 'react-icons/fa';

const SearchComponent = ({ onSearch }) => {
  const inputRef = useRef(null)
  const [isFocus, setIsFocus] = useState(false)
  const [isBlur, setIsBlur] = useState(false)

  const [querySearch, setQuerySearch] = useState("")

  const handleSearch = query => {
    setQuerySearch(query)
    onSearch(query);
  };

  const handleInputFocus = () => {
    setIsFocus(true)
    setIsBlur(false)
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Done') {
      handleInputIconClick()
    }
  };

  const handleInputBlur = () => {
    setIsBlur(true)
  };


  const handleInputIconClick = () => {
    if(isFocus) {
      setIsFocus(false)
      setIsBlur(true)
      inputRef.current.blur()
    } else {
      handleSearch("")
      setIsFocus(true)
      setIsBlur(false)
      inputRef.current.focus()
    }
  }

  return (
    <Box>
      <InputGroup >
        <Input 
          width={"100vw"}
          ref={inputRef}
          type="text"
          placeholder="Cari nama tempat/produk/layanan di Sumbawa"
          fontSize={12}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={querySearch}
          onKeyDown={handleKeyDown}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <InputRightElement>
          <IconButton
            aria-label="Search"
            icon={ querySearch == "" ? <FaSearchLocation /> : isFocus ? <FaCheck color="teal"/> : <FaWindowClose/>}
            onClick={handleInputIconClick}
            variant="outline"
          />
          
        </InputRightElement>
      </InputGroup>
      {!isFocus || isBlur ? <></> : 
      <Text color="gray" mt="1" ml="2" textAlign={"left"} fontSize="12">Sering dicari: AC, kurir, kopi, sate</Text>}
    </Box>
  );
};

export default SearchComponent;
