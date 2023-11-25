
import './App.css';
import { ChakraProvider, Text, VStack } from '@chakra-ui/react';
import {
  Box,
  Stack,
} from '@chakra-ui/react';
//import Homepage from '../routes/Homepage';
import CustomAppBar from './app/component/CustomAppBar';
import Homepage from './app/routes/Homepage';

function App() {
  return (
    <VStack
      bg="gray.200"
    >
      <Box
        minWidth="375px"
        width={{ base: '100%', md: '380px' }}
        borderColor="gray.200"
        bg="white"
      >
        <Stack
          spacing={14}
        >
          <CustomAppBar/>
        
          <Homepage/> 
          
        </Stack>
      </Box>
    </VStack>
  );
}

export default App;
