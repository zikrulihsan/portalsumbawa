// CardComponent.js
import React from 'react';
import {  Box, Icon, Heading, Flex, Link, Text, Tag, Button, VStack, useToast } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaShareAlt, FaWhatsapp } from 'react-icons/fa';
import copy from 'clipboard-copy';

const DetailInfo = ({ id, medsosLink, waNumber, title, highlight, description, tags, operationalTime, location, operationalDay, onCtaClick}) => {
  
  const redirectToLocation = (location) => {
    // Redirect logic here
    window.open(location, '_blank');
  };

  const toast = useToast();

  const handleCopyClick = async () => {
    try {
      await copy("http://localhost:3000/detailPage?itemId=" + id);
      toast({
        title: 'Link Siap Dibagikan Ke Kurir!',
        description: `Silahkan bagikan link ini untuk melihat detail penjual`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    } catch (error) {
      console.error('Failed to copy text to clipboard:', error);
    }
  };

  const orderMessage = "Halo, saya dapat nomornya dari Portal Sumbawa, boleh tanya tentang produknya?"
  
  const whatsappLink = "https://api.whatsapp.com/send/?phone=" + waNumber + "&text=" + encodeURI(orderMessage)
  
  return (
    <>
      <Heading as="h2" size="md" mb={2}>
        <Link>{title}</Link>
      </Heading>
      <Text color={'grey'} fontSize={16} mb={4}>{highlight}</Text>
      <Text mb={4}><b>Menyediakan:</b> {description}</Text>
      <Flex alignItems={"center"} gap={1}  mb={2}>
            <Box><FaMapMarkerAlt size={16}/></Box>
            <Link>{location}</Link>
        </Flex>
      <Text color={'teal'} mb={4}><b>Buka: </b>{operationalTime}, {operationalDay}</Text> 
        <Text mb={2}>Category:</Text>
        <Box mb={4}>
            {tags.map((tag, index) => (
                <Tag key={index} mr={2} mb={2}>
                    {tag}
                </Tag>
        ))}
        </Box>  
    {medsosLink != "-" && medsosLink != "" &&
        <Button 
            bgColor='facebook.500' 
            onClick={() => redirectToLocation(medsosLink)}
            color="white" 
            leftIcon={
                <Flex gap={1}>
                    <FaFacebook/><FaInstagram/>
                </Flex>
            }
            > Lihat di Media Sosial
        </Button>}   
    <Box 
        position={'fixed'}
        bottom="0"
        left="0"
        p={4}
        bgColor="white"
        boxShadow="inner"
        width="full"
        textAlign={"center"}
    >
        <Flex gap={2}>
            <Button 
                width="full" 
                colorScheme={'teal'} 
                mb={2} 
                onClick={()=> {redirectToLocation(whatsappLink)}}
                leftIcon={<FaWhatsapp/>}>
                Chat Penjual
            </Button>
            <Button 
                width="full" 
                colorScheme={'teal'} 
                variant="outline" 
                onClick={()=> {redirectToLocation("https://linktr.ee/PortalSumbawa")}}
                leftIcon={<FaWhatsapp/>}>
                Pesan Via Kurir
            </Button>
        </Flex>  
        <Button mt={2} mb={2} onClick={handleCopyClick} as={Link} leftIcon={<FaShareAlt/>} variant='link'><Text decoration={"underline"}>Copy Link untuk Teman/Kurir</Text></Button>
    </Box>
    </>
  );
};

export default DetailInfo;
