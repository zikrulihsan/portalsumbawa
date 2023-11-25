import { Image, Box, Heading, Flex, Link, Text, useBoolean, Spinner, Button, Collapse } from '@chakra-ui/react';
import { useState, useRef, useEffect, version } from 'react';
import SearchComponent from '../component/Search';

import CardComponent from '../component/CardComponent';
import db from '../firebase'
import { query, collection, where, doc, setDoc, getDocs, getDoc } from "firebase/firestore"; 
import { ADMIN_PHONE_NUMBER } from '../constant';
import PriorityCardComponent from '../component/PriorityCardComponent';
import { FaArrowDown, FaChevronDown, FaChevronUp, FaExclamationTriangle, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import YouTubeVideo from '../component/YoutubeVideo';

export default function Homepage(props) {
  const [data, setData] = useState([]);
  const [masterData, setMasterData] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  const onGotoExternalLink = (location) => {
    // Redirect logic here
    window.open(location, '_blank');
  };

  const WA_ADMIN_MESSAGE = "Halo Admin, saya sedang mencari " + searchQuery + " tapi datanya belum tersedia, mohon bantuannya."  
  const whatsappLink = "https://api.whatsapp.com/send/?phone=" + ADMIN_PHONE_NUMBER + "&text=" + encodeURI(WA_ADMIN_MESSAGE)
  

  const WA_CONTRIBUTOR_MESSAGE = "Halo Admin, saya ingin bertanya tentang kontributor di portal Sumbawa, mohon informasinya."  
  const whatsappLinkContributor = "https://api.whatsapp.com/send/?phone=" + ADMIN_PHONE_NUMBER + "&text=" + encodeURI(WA_CONTRIBUTOR_MESSAGE)
  
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
      setTimeout(() => {
        setIsExpanded(true)
      }, 500); 
      setTimeout(() => {
        setIsExpanded(false)
      }, 2000); 
    }
   
  };

  const rightExpandablesIcon = () => {
    return isExpanded ? <FaChevronUp/> : <FaChevronDown/>
  }

  const filter = async (query) => {

    if(query.length < 2 && query != "") return;

    setIsLoading(true)
    if(query != "") {
      setSearchQuery(query)
      setData(masterData.filter(item => !item.isPriority && (item.services ?? "").toLowerCase().includes(query.toLowerCase()) || item.name.toLowerCase().includes(query.toLowerCase())));
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
    <Box
      textAlign="center"
      py={4}
      mt={8}
    > 
      <Box mx={4} pt={8}>
 
      <SearchComponent
        onSearch={filter}
        />

      {isLoading ? <Spinner mt="16" size="xl"/> :
      <Box>
        {data.length > 0 ? <Box>

        { searchQuery == "" ? 
        <Box>
          <Button mt="2" fontSize={14} px="2" width="full" bgColor={"white"} onClick={ () => setIsExpanded(!isExpanded)}justifyContent={'space-between'} color="teal" rightIcon={rightExpandablesIcon()}>Daftar Nomor Darurat Sumbawa</Button>
          <Collapse in={isExpanded}>{data.map((item, index) => ( 
            <PriorityCardComponent 
              key={item.id}
              id={item.id}
              index={index}
              location={item.address}
              description={item.description}
              waNumber={item.phoneNumber}
              title={item.name}
              />))}
          </Collapse>
          <Flex p="2"  gap="2" borderRadius={3} bgColor="rgba(250, 164, 0, 0.07)" justifyContent={"flex-start"} alignItems="center" >
            <FaExclamationTriangle color="rgba(250, 164, 0, 1)" />
            <Text color="rgba(250, 164, 0, 1)" fontSize={11}>Hubungi Nomor Di Atas Hanya Dalam Keadaan Darurat</Text>
          </Flex>
        </Box>:
        data.map((item, index) => (<CardComponent
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
            <Heading fontSize={14}>Maaf Sanak, <br />Data belum tersedia.</Heading>
            <Text my={2} fontSize={12} px={4}>Kabarkan ke tim Sumbawa Portal untuk membantu anda mencari data yang diperlukan.</Text>
            <Button size={"sm"} onClick={()=> onGotoExternalLink(whatsappLink)} colorScheme={"teal"}>Beritahu Pencarian Anda</Button>
          </Box>}
        </Box>}
        {searchQuery == "" &&
          <Box textAlign={"left"} > 
            <Text textAlign={"left"} color="teal" m="2" fontSize={14} fontWeight="600">Yuk Ikut Gerakan Satu Data Sumbawa!</Text>
            <Text fontSize={12} mx="2" mb="2"> Portal Sumbawa adalah Platform Pencarian #1 Penyedia Jasa/Produk di Kabupaten Sumbawa. Karya Asli Muda Mudi Sumbawa.
            <br/><br/>Yuk, ikuti <b>Gerakan Satu Data Sumbawa</b> Bersama Tim Portal Sumbawa untuk memudahkan Ribuan masyarakat Sumbawa.</Text>

            <Flex gap={2} mb={2} ml={1}>
              <Button variant="outline" color="teal" size={"sm"} fontSize={11} leftIcon={<FaInstagram/>}>Instagram Portal Sumbawa</Button>
              <Button variant="outline" size={"sm"} fontSize={11} leftIcon={<FaWhatsapp/>}>Hubungi Admin</Button>
            </Flex>
            <YouTubeVideo videoId={"pv_4qe5ex5Q"} /> 
          </Box>
          }
        
      </Box>
    </Box>
  );
}
