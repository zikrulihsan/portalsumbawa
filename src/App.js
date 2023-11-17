
import './App.css';
import { ChakraProvider, Text } from '@chakra-ui/react';
import {
  Box,
  Stack,
} from '@chakra-ui/react';
//import Homepage from '../routes/Homepage';
import CustomAppBar from './app/component/CustomAppBar';
import Homepage from './app/routes/Homepage';

function App() {
  return (
    <Box
    display="flex"
    justifyContent="center"
    bgColor="gray.200"
  >
    <Box
      minWidth="375px"
      width={{ base: '100%', md: '380px' }}
      borderColor="gray.200"
      minHeight="200px"
      position="relative"
      bg="white"
    >
      <Stack
        spacing={14}
      >
        <Text>Halo</Text>
        <CustomAppBar/>
      
        <Homepage /> 
        
      </Stack>
    </Box>
  </Box>
  );
}

export default App;
