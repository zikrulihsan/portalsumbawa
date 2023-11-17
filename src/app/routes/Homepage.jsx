import { Box, Heading, Flex, Link, Text, useBoolean } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import SearchComponent from '../component/Search';

import CardComponent from '../component/CardComponent';
import db from '../firebase'
import { query, collection, where, doc, setDoc, getDocs,  } from "firebase/firestore"; 

export default function Homepage(props) {
  const [data, setData] = useState([]);
  const [masterData, setMasterData] = useState([])
  const [isSearchEmpty, setIsSearchEmpty] = useState("");

  const fetchData = async () => {
    let tempData = [];
    const querySnapshot = await getDocs(collection(db, "umkm"));
    querySnapshot.forEach((doc) => {
      tempData.push({"id": doc.id, ...doc.data()})
    });

    setData(tempData.filter(item => item.isPriority == true));
    setMasterData(tempData);
  };

  const filter = async (query) => {
    if(query != "")
      setData(masterData.filter(item => item.services.toLowerCase().includes(query.toLowerCase())));
    else 
      setData(masterData.filter(item => item.isPriority == true));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="space-between"
      textAlign="center"
      width="100%"
      height={"100vh"}
    >
      <Box ml="8" mr="8">
      <Heading as="h1" mt="16" fontSize={32}>Halo Sanak,</Heading>
      <Text fontSize={36} mb="8">mau cari apa sih hari ini?</Text>
      
      <SearchComponent
        onSearch={filter}
        />
      
      {data.map((item, index) => (
       <CardComponent
        key={item.id}
        id={item.id}
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
      ))}
      
      </Box>
  </Flex>
  );
}
