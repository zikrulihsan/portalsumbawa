import { Box, Button, Flex, Heading, Image, Stack, Text, useBoolean, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CustomAppBar({isDetailPage = false}) {

  return (
    <Flex
    bg={useColorModeValue('white', 'gray.800')}
    color={useColorModeValue('gray.600', 'white')}
    py={{ base: 2 }}
    position="fixed"
    px={{ base: 4 }}
    borderBottom={1}
    width={{ base: '100%', md: '380px' }}
    borderStyle={'solid'}
    height={16}
    borderColor={useColorModeValue('gray.200', 'gray.900')}
    align={'center'}
    zIndex={999}
  >
    <Flex flex={{ base: 1 }} justify={{ base: 'start' }} alignItems="center">
      {isDetailPage && <Link to={`/`}><Box mr={4}><FaChevronLeft size={20}/></Box></Link>}
      <Box>
        {isDetailPage  ? <Heading fontSize={20}>Halaman Detail</Heading> : 
      
        <Image
          src={
            '/portallogo.png'
          }
          height="40px"
        />}
      </Box>
    </Flex>
  </Flex>
  );
}
