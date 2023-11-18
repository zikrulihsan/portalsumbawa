// CardComponent.js
import React from 'react';
import { Box, Flex, Icon, Heading, Text, Tag, Button, VStack, propNames } from '@chakra-ui/react';
import { FaFire, FaMapMarkerAlt, FaPhone, FaStar, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CardComponent = ({ id, index, addressLink, isPriority, waNumber, title, highlight, description, operationalTime, location, operationalDay, onCtaClick}, ...props) => {
  
  const redirectToLocation = (location) => {
    // Redirect logic here
    window.open(location, '_blank');
  };
  const orderMessage = "Halo, saya dapat nomornya dari Portal Sumbawa, boleh tanya tentang produknya?"
  
  const whatsappLink = "https://api.whatsapp.com/send/?phone=" + waNumber + "&text=" + encodeURI(orderMessage)
  
  return (
    <Link to={isPriority ? '' : `/detailPage/${id}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        mt={index == 0 ? 2 :4}
        boxShadow="md"
        align="left"
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
            <a href={addressLink} target="_blank" rel="noopener noreferrer">{location}</a>
          </Flex>
        <Text color={isPriority ? 'black' : 'teal'}  mb={4}><b>Buka: </b>{operationalTime}, {operationalDay}</Text> 
        </Box>
        }
          
        {!isPriority ?
        <Button 
          width="full" 
          colorScheme={'teal'} 
          mb={2} 
          onClick={()=> {redirectToLocation(whatsappLink)}}
          leftIcon={<FaWhatsapp/>}>Chat Pemilik</Button>
        : <Flex gap="2" bgColor={'#E53E3E'} color="white" alignItems="center" py="2" borderRadius={4} justifyContent="center"> 
          <FaPhone/><a href="tel:+123456789">Hubungi Kami</a>
        </Flex>}
        {!isPriority &&
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
    </Link>
  );
};

export default CardComponent;
