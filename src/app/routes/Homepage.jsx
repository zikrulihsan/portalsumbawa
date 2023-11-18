import { Box, Heading, Flex, Link, Text, useBoolean, Spinner, Button } from '@chakra-ui/react';
import { useState, useRef, useEffect, version } from 'react';
import SearchComponent from '../component/Search';

import CardComponent from '../component/CardComponent';
import db from '../firebase'
import { query, collection, where, doc, setDoc, getDocs, getDoc } from "firebase/firestore"; 

export default function Homepage(props) {
  const [data, setData] = useState([]);
  const [masterData, setMasterData] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  const onGotoExternalLink = (location) => {
    // Redirect logic here
    window.open(location, '_blank');
  };
  const formLink = "https://docs.google.com/forms/d/e/1FAIpQLScfj6JYCMXojOo3FSFR4-UP8BIe5WfXtkEsYHkFcJw6fIgWyw/viewform"

  const fetchData = async () => {
    setIsLoading(true)

    try {
      let tempData = [];
      const currentVersion = localStorage.getItem("fireStoreVersion")
      const currentMasterData = JSON.parse(localStorage.getItem("masterData"))

      const remoteVersion = (await getDoc(doc(db, "version", "app-version"))).data().version;

      localStorage.setItem("fireStoreVersion", remoteVersion)

      if(currentVersion == remoteVersion && currentMasterData != null) {
        tempData = currentMasterData
      } else {
        const querySnapshot = await getDocs(collection(db, "umkm"));
        querySnapshot.forEach((doc) => {
          tempData.push({"id": doc.id, ...doc.data()})
        });

        localStorage.setItem("masterData", JSON.stringify(tempData))
      }

      setData(tempData.filter(item => item.isPriority == true));
      setMasterData(tempData);
    } catch (error) {
      
    } finally {
      setIsLoading(false)
    }
   
  };

  const filter = async (query) => {

    if(query.length < 3 && query != "") return;

    setIsLoading(true)
    if(query != "") {
      setSearchQuery(query)
      setData(masterData.filter(item => item.services.toLowerCase().includes(query.toLowerCase()) || item.name.toLowerCase().includes(query.toLowerCase())));
    }
    else {
      setSearchQuery("")
      setData(masterData.filter(item => item.isPriority == true));
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 500);
    
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

      <Text fontSize={14} mx="8" mb="8">Cari data yang anda butuhkan <br />di Portal Data #1 di Sumbawa.</Text>
      
      <SearchComponent
        onSearch={filter}
        />
      <Box>
      {isLoading ? <Spinner mt="16" size="xl"/> :
      data.length > 0 ? <Box>
      {searchQuery.length == 0 ? 
        <Box  mt={4}>
          <Text color="grey" mt={4} fontSize={12}>Hubungi Nomor Di Bawah Ini Dalam Keadaan Darurat:</Text>
        </Box>
        : <></>}
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
        category={item.category}
      />
      ))} </Box> : <Box 
          mt={16}
        >
          <Heading fontSize={18}>Maaf Sanak, <br />Data belum tersedia.</Heading>
          <Text my={2} px={4}>Kabarkan ke tim Sumbawa Portal untuk membantu anda mencari data yang diperlukan.</Text>
          <Button onClick={()=> onGotoExternalLink(formLink)} colorScheme={"teal"}>Beritahu Pencarian Anda</Button>
        </Box>}
      </Box>

      {searchQuery != "" ? <></> :
      <Box mt="32">
        <Text fontWeight={500} fontSize={15}>Ingin menjadi bagian dari pengembangan<br />  Portal Data Sumbawa? </Text>
        <Button mt={2} onClick={()=> onGotoExternalLink(formLink)} colorScheme={"teal"} >Jadi Kontributor Portal Data</Button>
      </Box>}
      
      </Box>
  </Flex>
  );
}
