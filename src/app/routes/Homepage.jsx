import { Box, Heading, Flex, Link, Text, useBoolean, Spinner, Button } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import SearchComponent from '../component/Search';

import CardComponent from '../component/CardComponent';
import db from '../firebase'
import { query, collection, where, doc, setDoc, getDocs,  } from "firebase/firestore"; 

export default function Homepage(props) {
  const [data, setData] = useState([]);
  const [masterData, setMasterData] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  const onGotoExternalLink = (location) => {
    // Redirect logic here
    window.open(location, '_blank');
  };
  const formLink = "https://docs.google.com/forms/d/e/1FAIpQLScU7bvfx9pVy5esZAB7ptFUQrjdWh5kR3xg96kGcTc4WE81Dw/viewform"

  const fetchData = async () => {
    setIsLoading(true)

    try {
      let tempData = [];
      const querySnapshot = await getDocs(collection(db, "umkm"));
      querySnapshot.forEach((doc) => {
        tempData.push({"id": doc.id, ...doc.data()})
      });
  
      setData(tempData.filter(item => item.isPriority == true));
      setMasterData(tempData);
    } catch (error) {
      
    } finally {
      setIsLoading(false)
    }
   
  };

  const filter = async (query) => {
    if(query != "") {
      setSearchQuery(query)
      setData(masterData.filter(item => item.services.toLowerCase().includes(query.toLowerCase()) || item.name.toLowerCase().includes(query.toLowerCase())));
    }
      else {
      setSearchQuery(setSearchQuery)
      setData(masterData.filter(item => item.isPriority == true));
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      textAlign="center"
      width="100%"
      height={"100vh"}
      mt={16}
    > 
      <Box ml="8" mr="8">
      <Heading as="h1" mt="16" fontSize={32}>Halo Sanak,</Heading>
      <Text fontSize={36} >mau cari apa hari ini?</Text>

      <Text fontSize={14} mx="8" mb="8">Cari yang anda butuhkan <br />di Portal Data #1 di Sumbawa.</Text>
      
      <SearchComponent
        onSearch={filter}
        />
      <Box>
      {isLoading ? <Spinner mt="16" size="xl"/> :
      data.length > 0 ? <Box>
      {searchQuery == "" ? <Text color="grey" mt={4} fontSize={14}>Atau hubungi nomor darurat di bawah ini:</Text> : <></>}
      {data.map((item, index) => (
       <CardComponent
        key={item.id}
        id={item.id}
        index={index}
        addressLink={item.addressLink}
        waNumber={item.phoneNumber}
        title={item.name}
        highlight={""}
        description={item.services}
        operationalDay={item.operationalDay}
        location={item.address}
        operationalTime={item.operationalTime}
        onCtaClick={()=>{}}
        isPriority={item.isPriority}
      />
      ))} </Box> : <Box 
          mt={16}
        >
          <Heading fontSize={18}>Maaf Sanak, <br />Data belum tersedia.</Heading>
          <Text my={2} px={4}>Kabarkan ke tim Sumbawa Portal untuk membantu anda mencari data yang diperlukan.</Text>
          <Button onClick={()=> onGotoExternalLink(formLink)} colorScheme={"teal"}>Beritahu Pencarian Anda</Button>
        </Box>}
      </Box>
      
      </Box>
  </Flex>
  );
}
