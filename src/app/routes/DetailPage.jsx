import React from 'react'
import CustomAppBar from '../component/CustomAppBar';
import {
    Box,
    Stack,
    Flex,
    Spinner
  } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import DetailInfo from '../component/DetailInfo';
import { useLocation, useParams } from 'react-router-dom';
import db from '../firebase'
import { collection, getDoc, doc } from "firebase/firestore"; 

export default function DetailPage() {
    const {itemId} = useParams();

    const [item, setItem] = useState({});
    const [isSearchEmpty, setIsSearchEmpty] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const querySnapshot = await getDoc(doc(db, "umkm", itemId));
            setItem(querySnapshot.data());
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
        
    };

    useEffect(() => {
        fetchData();
    }, []);


  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="full"
      background="gray.200"
     
    > 
      {isLoading ? <Spinner size={'xl'}/> :
      <Box
        minWidth="375px"
        width={{ base: '100%', md: '380px' }}
        borderColor="gray.200"
        minHeight="200px"
        position="relative"
        bg="white"
      >
        <Stack
          spacing={14}
        >
        <CustomAppBar
            isDetailPage={true}
        />
        <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="space-between"
            textAlign="center"
            width="100%"
        >
        <Box 
            ml="8"
            mr="8"
            mt="20"
            textAlign={"left"}
            height="100vh"
        >
          <DetailInfo
              //id={itemId}
              waNumber={item.phoneNumber}
              title={item.name}
              highlight={""}
              tags={item.category}
              description={item.services}
              operationalDay={item.operationalDay}
              location={item.address}
              addressLink={item.addressLink}
              medsosLink={item.mediaSocialLink}
              operationalTime={item.operationalTime}
              onCtaClick={()=>{}}
              isPriority={item.isPriority}
          />
        </Box>
            </Flex>
            </Stack>
    </Box>}
    </Box>
    
  )
}
