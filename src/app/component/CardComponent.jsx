// CardComponent.js
import React from 'react';
import { Box, Flex, Icon, Heading, Text, Tag, Button, VStack, propNames } from '@chakra-ui/react';
import { FaFire, FaMapMarkerAlt, FaPhone, FaStar, FaWhatsapp } from 'react-icons/fa';

const CardComponent = ({ id, category, index, addressLink, isPriority, waNumber, title, highlight, description, operationalTime, location, operationalDay, onCtaClick}, ...props) => {

  const redirectToLocation = (location) => {
    // Redirect logic here
    window.open(location, '_blank');
  };

  const redirectToPage = (page) => {
    if(isPriority) return
    window.location.href = page;
  };

  const convertedWaNumber = () => {
    if(isEmpty(waNumber)) return '628338588078';
    return '62' + waNumber.slice(1);
  }
  
  const isEmpty = (data) => {
    return data == "-" || data == "" || data == null || data == undefined
  }
  const waMessage = isEmpty(waNumber) 
                      ? "Halo Admin, nomor telepon " + title + " belum tersedia, bisa minta bantuannya?" 
                      : "Halo, saya dapat nomornya dari Portal Sumbawa, boleh tanya tentang produknya?"
  
  const whatsappLink = "https://api.whatsapp.com/send/?phone=" + convertedWaNumber() + "&text=" + encodeURI(waMessage)
  
  const isHotel = () => {
    if(category != undefined && category.length > 0)
      return category[0].includes("Hotel")
    else return false
  }

  return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        mt={index == 0 ? 2 :4}
        boxShadow="md"
        align="left"
        onClick={() => redirectToPage('/detailPage/'+id)}
        >
        <Flex justifyContent={'space-between'}>
          <Heading as="h2" size="md" mb={2}>{title}</Heading>
          {isPriority && <Box>
            <FaFire color="gold" size={24}/>
          </Box>}
          
        </Flex>
        <Text color={'grey'} fontSize={16} mb={4}>{highlight}</Text>
        {isPriority ? <></> : 
        <Box><Text mb={4}>{ <b>Menyediakan:</b>} {description}</Text>
        
          <Flex alignItems={"center"} gap={1}  mb={2}>
            <Box><FaMapMarkerAlt size={16}/></Box>
            <Text href={addressLink} target="_blank" rel="noopener noreferrer">{location}</Text>
          </Flex>
        {isEmpty(operationalDay) && isEmpty(operationalTime) 
          ? <></> 
          : <Text color={isPriority ? 'black' : 'teal'}  mb={4}><b>Buka: </b>{operationalTime}, {operationalDay}</Text>}
        </Box>
        }
          
        {!isPriority ?
          <Box>
            {!isEmpty(waNumber) ?
            <Button 
              width="full" 
              colorScheme={'teal'} 
              mb={2} 
              isDisabled={isEmpty(waNumber)}
              onClick={()=> {redirectToLocation(whatsappLink)}}
              leftIcon={<FaWhatsapp/>}>
                Chat Pemilik
            </Button> : <></> }
            {!isEmpty(waNumber) ? <></> :
              <Box>
                <Button 
                  width="full" 
                  colorScheme={'teal'} 
                  onClick={()=> {redirectToLocation(whatsappLink)}}
                  leftIcon={<FaWhatsapp/>}>
                  Hubungi Admin
                </Button>
                <Text fontSize={10} mt={1} mb={2}>Nomor Telepon/WA Pengguna Masih Belum tersedia, <a>Hubungi Admin</a> Untuk Pembaruan Data</Text>
              </Box>
          }
          </Box>
        : <Flex gap="2" bgColor={'#E53E3E'} color="white" alignItems="center" py="2" borderRadius={4} justifyContent="center"> 
          <FaPhone/><a href="tel:+123456789">Hubungi Kami</a>
        </Flex>}
        {!isPriority && !isHotel() &&
          <Button 
            width="full" 
            colorScheme={'teal'} 
            variant="outline" 
            onClick={()=> {redirectToLocation("https://linktr.ee/PortalSumbawa")}}
            leftIcon={<FaWhatsapp/>}>
              Pesan Via Kurir
          </Button>
        } 

      </Box>
  );
};

export default CardComponent;
