// CardComponent.js
import React from 'react';
import { Box, Flex, Icon, Heading, Text, Tag, Button, VStack, propNames } from '@chakra-ui/react';
import { FaFire, FaMapMarkerAlt, FaPhone, FaStar, FaWhatsapp } from 'react-icons/fa';

const CardComponent = ({ id, category, index, addressLink, isPriority, waNumber, title, highlight, description, operationalTime, location, operationalDay, onCtaClick}, ...props) => {

  const redirectToLocation = (address) => {
    let validAddress = address
    if(address.startsWith("https://api.whatsapp.com") && !validatePhoneNumber())
        validAddress = "tel:" + waNumber

    window.open(validAddress, '_blank'); 

  };

  const validatePhoneNumber = () => {
    return convertedWaNumber().substring(0, 3).toString() == "628"
  }

  const redirectToPage = (page) => {
    if(isPriority) return
    window.location.href = page;
  };

  const isKurir = () => {
    return description.toLowerCase().includes("kurir")
  }

  const convertedWaNumber = () => {
    if(isEmpty(waNumber)) return '6282338588078';
    if(waNumber.substring(0, 2).toString() == "08")
      return '62' + waNumber.slice(1);

    return waNumber
  }
  
  const isEmpty = (data) => {
    return data == "-" || data == "" || data == null || data == undefined
  }
  const waMessage = isEmpty(waNumber) 
                      ? `Halo Admin, mohon bantuannya untuk mencarikan info lebih lanjut tentang ${title.toString()}.` 
                      : "Halo, saya dapat nomornya dari Portal Sumbawa, boleh tanya tentang produknya?"
  
  const whatsappLink = "https://api.whatsapp.com/send/?phone=" + convertedWaNumber() + "&text=" + waMessage
  
  const isService = () => {
    if(!description) return false;
    return !isPriority && !description.toLowerCase().includes("minum") && description.toLowerCase().includes("makan")
  }

  return (
      <Box
        borderWidth="1px"
        borderRadius="md"
        overflow="hidden"
        p={4}
        mt={index == 0 ? 2 :4}
        boxShadow="sm"
        align="left"
        onClick={() => redirectToPage('/detailPage/'+id)}
        >
        <Flex justifyContent={'space-between'} gap={8}>
          <Heading as="h2" size="md" mb={2} fontSize="14">{title}</Heading>
          {isPriority && <Box>
            <FaFire color="gold" size={24}/>
          </Box>}
          
        </Flex>
        {isPriority ? <></> : 
        <Box><Text fontSize="12" mb={4}>{ <b>Menyediakan:</b>} {description}</Text>
        
          <Flex alignItems={"center"} gap={1}  mb={2}>
            <Box><FaMapMarkerAlt size={16}/></Box>
            {!isEmpty(location) 
              ? <Text fontSize="12" href={addressLink} target="_blank" rel="noopener noreferrer">{location}</Text> 
              : <Text fontSize="12" color={"gray"}>Alamat belum terdata</Text>}
            
          </Flex>
        {isEmpty(operationalDay) && isEmpty(operationalTime) 
          ? <></> 
          : <Text color={isPriority ? 'black' : 'teal'} fontSize="12"  mb={4}><b>Buka: </b>{operationalTime}, {operationalDay}</Text>}
        </Box>
        }
          
        {!isPriority ?
          <Box>
            <Button 
              width="full" 
              colorScheme={'teal'}  
              fontSize="12"
              size={"sm"}
              mb="2"
              isDisabled={isEmpty(waNumber)}
              onClick={()=> {redirectToLocation(whatsappLink)}}
              leftIcon={<FaWhatsapp/>}>
                Chat Pemilik
            </Button>
          </Box>
        : <Button 
            width="full" 
            fontSize="12"
            size={"sm"}
            rightIcon={<FaPhone/>} 
            colorScheme="red"
            onClick={() => redirectToLocation(`tel:${waNumber}`)}>Hubungi Sekarang</Button>}
        {!isService() && !isPriority && !isEmpty(waNumber) && !isKurir() ?
          <Button 
            width="full" 
            colorScheme={'teal'} 
            variant="outline" 
            fontSize="12"
            size={"sm"}
            onClick={()=> {redirectToLocation("https://linktr.ee/PortalSumbawa")}}
            leftIcon={<FaWhatsapp/>}>
              Pesan Via Kurir
          </Button> : isPriority || isKurir() || isService() ? <></> :
              <Box>
                <Text fontSize={10} mt={1} mb={2}>Nomor Telepon/WA Pengguna Masih Belum tersedia, <a>Hubungi Admin</a> Untuk Pembaruan Data</Text>
                <Button 
                  width="full" 
                  colorScheme={'teal'} 
                  onClick={()=> {redirectToLocation(whatsappLink)}}
                  variant={"outline"}
                  fontSize="12"
                  size={"sm"}
                  leftIcon={<FaWhatsapp/>}>
                  Hubungi Admin
                </Button>
              </Box>
        } 

      </Box>
  );
};

export default CardComponent;
