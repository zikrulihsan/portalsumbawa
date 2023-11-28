// SearchComponent.js
import React, { useRef, useEffect, useState } from 'react';
import { Text, Box, Input, InputGroup, InputRightElement, IconButton, Button } from '@chakra-ui/react';
import { FaArrowRight, FaCheck, FaCross, FaRemoveFormat, FaSearchLocation, FaWhatsapp, FaWindowClose } from 'react-icons/fa';

const SearchComponent = ({ searchQuery = "", onSearch, inputRef, onToTimPortal }) => {
  
  const [isFocus, setIsFocus] = useState(true)
  const [isBlur, setIsBlur] = useState(false)

  const [querySearch, setQuerySearch] = useState("")

  const handleSearch = query => {
    setQuerySearch(query)
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

  useEffect(() => {
    if(searchQuery) 
     handleSearch(searchQuery)
  }, [])
  

  return (
    <Box >
      <Box boxShadow={"md"}>
      <InputGroup >
        <Input 
          
          width={"100vw"}
          borderWidth="2"
          ref={inputRef}
          type="text"
          placeholder="Cari layanan/produk/tempat di Sumbawa"
          fontSize={13}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={querySearch}
          onKeyDown={handleKeyDown}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </InputGroup>
      </Box>
      <Text color="gray" mt="1" textAlign={"left"} fontSize="11">Sering dicari: Servis AC, kurir, kopi, sate</Text>
     
      <Button 
        mt="2"
        width="full" 
        colorScheme={'teal'} 
        onClick={()=> {onSearch(querySearch)}}
        fontSize="12"
        size={"sm"}
        leftIcon={<FaSearchLocation/>}>
        Cari di Web Portal
      </Button>
      <Button 
        mt="2"
        width="full" 
        colorScheme={'teal'} 
        onClick={onToTimPortal}
        variant="outline"
        fontSize="12"
        size={"sm"}
        rightIcon={<FaArrowRight/>}>
        Cari Melalui Tim Portal,<Text mx="1" textDecoration={"line-through"}>Rp 5000,00</Text> <b>Gratis!</b>
      </Button>
      
    </Box>
  );
};

export default SearchComponent;
