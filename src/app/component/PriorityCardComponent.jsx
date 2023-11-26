// CardComponent.js
import React from 'react';
import { Box, Flex, Icon, Heading, Text, Tag, Button, VStack, propNames, IconButton } from '@chakra-ui/react';
import { FaFire, FaMapMarkerAlt, FaPhone, FaStar, FaWhatsapp } from 'react-icons/fa';

const PriorityCardComponent = ({ id, index, waNumber, title, description, location}, ...props) => {

  const redirectToLocation = () => {
    let validAddress = "tel:" + waNumber

    window.open(validAddress, '_blank'); 

  };

  return (
      <Box
        borderRadius="sm"
        overflow="hidden"
        py={2}
        px={4}
        mt={1}
        align="left"
        onClick={redirectToLocation}
        bgColor="rgba(233, 227, 227, 0.18)"
        >
        <Flex justifyContent={'space-between'} alignItems="center" gap={8}>
          <Text fontWeight={"500"} size="md" fontSize={14}>{title}</Text>
          <IconButton 
            variant={"outline"}
            icon = {<FaPhone/>}
            size="12544545"
            p="2"
            colorScheme="teal"
          />
          
        </Flex>
     

      </Box>
  );
};

export default PriorityCardComponent;
