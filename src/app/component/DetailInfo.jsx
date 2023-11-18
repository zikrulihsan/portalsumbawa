// CardComponent.js
import React from 'react';
import {  Box, Icon, Heading, Flex, Link, Text, Tag, Button, VStack, useToast } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaShareAlt, FaWhatsapp } from 'react-icons/fa';
import copy from 'clipboard-copy';

const DetailInfo = ({ id, addressLink, medsosLink, waNumber, title, highlight, description, tags, operationalTime, location, operationalDay, onCtaClick}) => {
  
  const redirectToLocation = (address) => {
    let validAddress = address
    if(address.startsWith("https://api.whatsapp.com") && !validatePhoneNumber())
        validAddress = "tel:" + waNumber

    window.open(validAddress, '_blank'); 

  };
  
  const validatePhoneNumber = () => {
    return convertedWaNumber().substring(0, 3).toString() == "628"
  }

  const toast = useToast();

  const handleCopyClick = async () => {
    try {
      await copy(window.location.href);
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
  const waMessage = isEmpty(waNumber) || isKurir()
                      ? `Halo Admin, mohon bantuannya untuk mencarikan info lebih lanjut tentang ${title.toString()}.` 
                      : "Halo, saya dapat nomornya dari Portal Sumbawa, boleh tanya tentang produknya?"
  
  const whatsappLink = "https://api.whatsapp.com/send/?phone=" + convertedWaNumber() + "&text=" + waMessage
  
  const isHotel = () => {
    if(tags != undefined && tags.length > 0)
      return tags[0].includes("Hotel")
    else return false
  }

  return (
    <>
      <Heading as="h2" size="md" mb={2}>
        <Link>{title}</Link>
      </Heading>
      <Text color={'grey'} fontSize={16} mb={4}>{highlight}</Text>
      <Text mb={4}><b>Menyediakan:</b> {description}</Text>
      <Flex alignItems={"center"} gap={1}  mb={2}>
            <Box><FaMapMarkerAlt size={16}/></Box>
            {!isEmpty(location) ?
            <a href={addressLink} target="_blank" rel="noopener noreferrer">{location}</a> : <Text color={"gray"}>Alamat belum terdata</Text>}
        </Flex>
      <Text color={'teal'} mb={4}><b>Buka: </b>{!isEmpty(operationalTime) ? operationalTime + "," : "Jadwal Operasional Belum Terdata"} {operationalDay}</Text> 
        <Text mb={2}>Category:</Text>
        {!isEmpty(tags) &&
        <Box mb={4}>
            {tags.map((tag, index) => (
                <Tag key={index} mr={2} mb={2}>
                    {tag}
                </Tag>
        ))}
        </Box>}
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
                isDisabled={isEmpty(waNumber)}
                onClick={()=> {redirectToLocation(whatsappLink)}}
                leftIcon={<FaWhatsapp/>}>
                Chat Pemilik
            </Button>
            {isHotel() || isKurir() || isEmpty(waNumber) ? <Button 
                width="full" 
                colorScheme={'teal'} 
                variant="outline" 
                onClick={()=> {redirectToLocation(whatsappLink)}}
                leftIcon={<FaWhatsapp/>}>
                Hubungi Admin
            </Button> : <Button 
                width="full" 
                colorScheme={'teal'} 
                variant="outline" 
                onClick={()=> {redirectToLocation("https://linktr.ee/PortalSumbawa")}}
                leftIcon={<FaWhatsapp/>}>
                Pesan Via Kurir
            </Button> }
        </Flex>  
        <Button mt={2} mb={2} onClick={handleCopyClick} as={Link} leftIcon={<FaShareAlt/>} variant='link'><Text decoration={"underline"}>Copy Link untuk Teman/Kurir</Text></Button>
    </Box>
    </>
  );
};

export default DetailInfo;
