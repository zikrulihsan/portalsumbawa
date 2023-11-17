// CardComponent.js
import React from 'react';
import { Box, Flex, Icon, Heading, Text, Tag, Button, VStack, propNames } from '@chakra-ui/react';
import { FaFire, FaMapMarkerAlt, FaPhone, FaStar, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CardComponent = ({ id, isPriority, waNumber, title, highlight, description, operationalTime, location, operationalDay, onCtaClick}, ...props) => {
  
  const redirectToLocation = (location) => {
    // Redirect logic here
    window.open(location, '_blank');
  };
  const orderMessage = "Halo, saya dapat nomornya dari Portal Sumbawa, boleh tanya tentang produknya?"
  
  const whatsappLink = "https://api.whatsapp.com/send/?phone=" + waNumber + "&text=" + encodeURI(orderMessage)
  
  return (
    <Link to={isPriority ? '' : `/detailPage?itemId=${id}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        mt={4}
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
        <Text mb={4}>{isPriority ? <></> : <b>Menyediakan:</b>} {description}</Text>
        
        {!isPriority &&
          <Flex alignItems={"center"} gap={1}  mb={2}>
            <Box><FaMapMarkerAlt size={16}/></Box>
            <Link>{location}</Link>
          </Flex>}
        <Text color={isPriority ? 'black' : 'teal'}  mb={4}><b>Buka: </b>{operationalTime}, {operationalDay}</Text>
        
          
        <Button 
          width="full" 
          colorScheme={isPriority ? 'red' : 'teal'} 
          mb={2} 
          onClick={()=> {redirectToLocation(whatsappLink)}}
          leftIcon={isPriority ? <FaPhone/> : <FaWhatsapp/>}>
            {isPriority ? `Hubungi Sekarang`: "Chat Penjual"}
        </Button>
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
