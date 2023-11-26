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
  const [isCampaignExpanded, setIsCampaignExpanded] = useState(false)
  const [isRegisterExpanded, setIsRegisterExpanded] = useState(false)
  const inputRef = useRef(null)
  const [isDisplayTitle, setIsDisplayTitle] = useState(true)

  const onGotoExternalLink = (location) => {
    // Redirect logic here
    window.open(location, '_blank');
  };

  const WA_ADMIN_MESSAGE = "Halo Admin, saya ingin mengetahui lebih lanjut tentang Portal Sumbawa."  
  const WA_NOT_FOUND = `Halo Admin, saya sedang mencari ${searchQuery} tapi belum ada datanya, mohon bantuannya.`  
  const WA_ADMIN_REGISTER = "Halo Admin, saya ingin menambahkan data penyedia jasa/produk di Portal Sumbawa, mohon bantuannya." 
  const whatsappLink = "https://api.whatsapp.com/send/?phone=" + ADMIN_PHONE_NUMBER + "&text=" + encodeURI(WA_ADMIN_MESSAGE)
  
  const whatsappLinkRegister = "https://api.whatsapp.com/send/?phone=" + ADMIN_PHONE_NUMBER + "&text=" + encodeURI(WA_ADMIN_REGISTER)
  const whatsappLinkNotFound = "https://api.whatsapp.com/send/?phone=" + ADMIN_PHONE_NUMBER + "&text=" + encodeURI(WA_NOT_FOUND)
  

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
      inputRef.current.focus()
      setTimeout(() => {
        setIsExpanded(true)
      }, 500); 
      // setTimeout(() => {
      //   setIsCampaignExpanded(true)
      //   inputRef.current.focus()
      // }, 500); 
    }
   
  };

  const rightExpandablesIcon = () => {
    return isExpanded ? <FaChevronUp/> : <FaChevronDown/>
  }

  const rightExpandablesCampaignIcon = () => {
    return isCampaignExpanded ? <FaChevronUp/> : <FaChevronDown/>
  }

  const rightExpandablesRegisterIcon = () => {
    return isRegisterExpanded ? <FaChevronUp/> : <FaChevronDown/>
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
      minHeight="100vh"
    > 
      <Box mx={4} pt={8}>
      <Heading as="h2" textAlign="center" fontSize={16} ml="2" mb="2" >Halo Sanak, mau cari apa hari ini?</Heading>
      <SearchComponent
        onSearch={filter}
        inputRef={inputRef}
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
            mt={4}
            p={4}
           
          >
            <Heading fontSize={14}>Tidak ada data yang cocok dengan pencarian.</Heading>
            <Text my={2} fontSize={12} >Coba cari dengan kata kunci lain atau minta admin Portal Sumbawa untuk membantu mencari data yang diperlukan.</Text>
            <Button leftIcon={<FaWhatsapp/>} size={"sm"} onClick={()=> onGotoExternalLink(whatsappLinkNotFound)} width="full" colorScheme={"teal"}>Hubungi Admin</Button>
          </Box>}
        </Box>}

        {isLoading || searchQuery != "" ? <></> : <Box>
        <Button mt="2" fontSize={14} px="2" width="full" bgColor={"white"} onClick={ () => setIsCampaignExpanded(!isCampaignExpanded)} justifyContent={'space-between'} color="teal" rightIcon={rightExpandablesCampaignIcon()}>Yuk Ikut Gerakan Satu Data Sumbawa</Button>
          <Collapse in={isCampaignExpanded}>
            <Box textAlign={"left"} > 
              <Text fontSize={12} mx="2"> Portal Sumbawa adalah Platform Pencarian Penyedia Jasa/Produk #1 di Kabupaten Sumbawa. Karya Asli Muda Mudi Sumbawa.
              <br/><br/>Yuk, ikuti <b>Gerakan Satu Data Sumbawa</b> Bersama Tim Portal Sumbawa untuk mengetahui update terbaru Portal Sumbawa.</Text>
              <Flex gap={2} my={2} ml={1}>
                <Button onClick={() => onGotoExternalLink("https://www.instagram.com/portalsumbawa/?hl=en")} variant="outline" color="teal" size={"sm"} fontSize={11} leftIcon={<FaInstagram/>}>Instagram Portal Sumbawa</Button>
                <Button onClick={() => onGotoExternalLink(whatsappLink)}variant="outline" size={"sm"} fontSize={11} leftIcon={<FaWhatsapp/>}>WA Admin Portal</Button>
              </Flex>

              {/* <YouTubeVideo videoId={"pv_4qe5ex5Q"} />  */}
            </Box>
          </Collapse> 
          
        </Box>}
        {isLoading || data.length == 0 ? <></> : <Box>
        <Button mt="2" fontSize={14} px="2" width="full" bgColor={"white"} onClick={ () => setIsRegisterExpanded(!isRegisterExpanded)} justifyContent={'space-between'} color="teal" rightIcon={rightExpandablesRegisterIcon()}>Cara Agar Terdata Di Portal Sumbawa</Button>
          <Collapse in={isRegisterExpanded}>
            <Box textAlign={"left"} mx="2" > 
              <Text fontSize={12}> Hubungi admin WA Portal Sumbawa untuk mengajukan pembaruan atau penambahan data penyedia produk/jasa yang anda miliki.</Text>
              <Text fontSize={12} mb="2"> <br/> Tim Portal sumbawa akan melakukan verifikasi sederhana sebelum menginputkan usaha anda ke dalam portal data.</Text>
              <Button onClick={() => onGotoExternalLink(whatsappLinkRegister)} width="full" color="teal" size={"sm"} fontSize={11} leftIcon={<FaWhatsapp/>}>Daftar Melalui Admin</Button>
           
              </Box>
          </Collapse> 
         
        </Box>}
        
      </Box>
    </Box>
  );
}
